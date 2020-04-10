import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import getUserId from '../../lambda/utils'
import { getCategoryById } from '../../businessLogic/categoryService';
import { getProductsByCategory } from '../../businessLogic/productsService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Caller event', event)
  const categoryId = event.pathParameters.categoryId
  const userId = getUserId(event)
  const validCategoryId = !!(await getCategoryById(categoryId, userId))

  if (!validCategoryId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Category does not exist'
      })
    }
  }

  const products = await getProductsByCategory(categoryId, userId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: products
    })
  }
}

