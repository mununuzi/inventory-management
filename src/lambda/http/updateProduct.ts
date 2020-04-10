import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import getUserId from '../../lambda/utils'
import { UpdateProductRequest } from '../../requests/UpdateProductRequest'
import { udpateProduct } from '../../businessLogic/productsService'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productId = event.pathParameters.productId
  const updatedTodo: UpdateProductRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  const updatedItem = await udpateProduct(productId, userId, updatedTodo)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      updatedItem
    })
  }
}
