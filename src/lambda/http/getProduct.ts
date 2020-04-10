import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'

// const XAWS = AWSXRay.captureAWS(AWS)

const docClient = new AWS.DynamoDB.DocumentClient()

const productsTable = process.env.PRODUCTS_TABLE
const productIdIndex = process.env.PRODUCT_ID_INDEX

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const productId = event.pathParameters.productId

  const result = await docClient.query({
      TableName : productsTable,
      IndexName : productIdIndex,
      KeyConditionExpression: 'productId = :productId',
      ExpressionAttributeValues: {
          ':productId': productId
      }
  }).promise()

  if (result.Count !== 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Items[0])
    }
  }

  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
