import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Product } from '../models/Product'
import { UpdateProductRequest } from '../requests/UpdateProductRequest'

export class ProductsAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly productsTable = process.env.PRODUCTS_TABLE,
    private readonly categoryIdIndex = process.env.CATEGORY_ID_INDEX) {
  }

  async getAllProducts(userId: String): Promise<Product[]> {
    console.log('Getting all products')
    const result = await this.docClient.query({
        TableName: this.productsTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ScanIndexForward: false
      }).promise();
    
      const items = result.Items;
    return items as Product[]
  }

  async createProduct(product: Product): Promise<Product> {
    await this.docClient.put({
        TableName: this.productsTable,
        Item: product
      }).promise();

    return product
    
  }

  async updateProduct(productId: String, userId: String, updatedProduct: UpdateProductRequest) {
    const updatedItem = await this.docClient.update({
        TableName: this.productsTable,
        Key: {
          userId: userId,
          productId: productId
        },
        UpdateExpression: 'SET #n = :name, upc = :upc, unitPrice = :price, quantity = :quantity, categoryId = :categoryId, restockPoint = :restockPoint, sizeUnit = :sizeUnit',
        ExpressionAttributeValues : {
          ':name': updatedProduct.name,
          ':upc': updatedProduct.upc,
          ':price': updatedProduct.unitPrice,
          ':quantity': updatedProduct.quantity,
          ':categoryId': updatedProduct.categoryId,
          ':restockPoint': updatedProduct.restockPoint,
          ':sizeUnit': updatedProduct.sizeUnit
        },
        ExpressionAttributeNames: {
          '#n': 'name'
        }, ReturnValues: 'ALL_NEW'
      }).promise();
      
      return updatedItem
  }

  async deleteProduct(productId: String, userId: String) {
    await this.docClient.delete({
        TableName: this.productsTable,
        Key: {
          userId: userId,
          productId: productId
        }
      }).promise();
  }

  async getProductsByCategory(categoryId: string, userId: string) {
    const result = await this.docClient.query({
      TableName: this.productsTable,
      IndexName : this.categoryIdIndex,
      KeyConditionExpression: 'userId = :userId AND categoryId = :categoryId',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':categoryId': categoryId
      },
      ScanIndexForward: false
    }).promise()
  
    return result.Items
  }
 
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      service: AWSXRay.captureAWSClient(new AWS.DynamoDB)
    })
  }

  return new AWS.DynamoDB.DocumentClient({service: AWSXRay.captureAWSClient(new AWS.DynamoDB), convertEmptyValues:true})
}

