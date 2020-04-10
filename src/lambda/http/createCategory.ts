import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { CreateCategoryRequest } from '../../requests/CreateCategoryRequest'
import { createCategory } from '../../businessLogic/categoryService'
import getUserId from '../../lambda/utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const newCategory: CreateCategoryRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  const newItem = await createCategory(newCategory, userId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem
    })
  }
}
