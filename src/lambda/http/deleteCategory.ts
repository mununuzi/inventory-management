import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import getUserId from '../../lambda/utils'
import { deleteCategory } from '../../businessLogic/categoryService'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const catId = event.pathParameters.categoryId
  const userId = getUserId(event)
  await deleteCategory(catId, userId)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({})
  }
} 
