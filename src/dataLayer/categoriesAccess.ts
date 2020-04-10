import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Category } from '../models/Category'
import { UpdateCategoryRequest } from '../requests/UpdateCategoryRequest'

export class CategoryAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly categoryTable = process.env.CATEGORIES_TABLE) {
  }

  async getAllCategories(userId: string): Promise<Category[]> {
    console.log('Getting all Categories')

    const result = await this.docClient.query({
      TableName: this.categoryTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise();

    const items = result.Items
    return items as Category[]
  }

  async createCategory(category: Category): Promise<Category> {
    await this.docClient.put({
      TableName: this.categoryTable,
      Item: category
    }).promise()

    return category
  }


  async deleteCategory(catId: String, userId: String) {
    await this.docClient.delete({
        TableName: this.categoryTable,
        Key: {
          userId: userId,
          categoryId: catId
        }
      }).promise();
  }

  async updateCategory(catId: String, userId: String, updatedCat: UpdateCategoryRequest) {
    await this.docClient.update({
        TableName: this.categoryTable,
        Key: {
          userId: userId,
          categoryId: catId
        },
        UpdateExpression: 'SET #n = :name, description = :description',
        ExpressionAttributeValues : {
          ':name': updatedCat.name,
          ':description': updatedCat.description
        },
        ExpressionAttributeNames: {
          '#n': 'name'
        }
      }).promise();
  }


async getCategoryById(categoryId: string, userId: string) {
  const result = await this.docClient
    .get({
      TableName: this.categoryTable,
      Key: {
        userId: userId,
        categoryId: categoryId
      }
    })
    .promise()

  console.log('Get category: ', result)
  return result.Item
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

  return new AWS.DynamoDB.DocumentClient({service: AWSXRay.captureAWSClient(new AWS.DynamoDB)})
}
