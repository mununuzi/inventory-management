import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateProductRequest } from '../../requests/CreateProductRequest'
import { createProduct } from '../../businessLogic/productsService'
import { getCategoryById } from '../../businessLogic/categoryService'
import getUserId from '../../lambda/utils'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'

// import * as AWSXRay from 'aws-xray-sdk'

// const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const bucketName = process.env.PRODUCTS_S3_BUCKET
const urlExpiration = Number(process.env.SIGNED_URL_EXPIRATION)

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const categoryId = event.pathParameters.categoryId
  const userId = getUserId(event)
  const newProduct: CreateProductRequest = JSON.parse(event.body);
  const validcategoryId = !!(await getCategoryById(categoryId, userId))
  if (!validcategoryId) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Category does not exist'
      })
    }
  }

  const newItem = await createProduct(categoryId, newProduct, userId)

  const url = getUploadUrl(newItem.productId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}

function getUploadUrl(productId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: productId,
    Expires: urlExpiration
  })
}
