import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import getUserId from '../../lambda/utils'
import { UpdateCategoryRequest } from '../../requests/UpdateCategoryRequest'
import { updateCategory } from '../../businessLogic/categoryService'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const catId = event.pathParameters.categoryId
  const updatedCategory: UpdateCategoryRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  // Update a TODO item with the provided id using values in the "updatedTodo" object
  await updateCategory(catId, userId, updatedCategory)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({})
  }
}
