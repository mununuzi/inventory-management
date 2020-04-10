import * as uuid from 'uuid'

import { Product } from '../models/Product'
import { ProductsAccess } from '../dataLayer/productsAccess'
import { CreateProductRequest } from '../requests/CreateProductRequest'
import { UpdateProductRequest } from '../requests/UpdateProductRequest'


const productAccess = new ProductsAccess()
const bucketName = process.env.PRODUCTS_S3_BUCKET

export async function getAllProducts(userId: String): Promise<Product[]> {
    return productAccess.getAllProducts(userId)
  }
  
  export async function createProduct(categoryId: string, productRequest: CreateProductRequest, userId: string
  ): Promise<Product> {

    const productId = uuid.v4()
    const createdAt = new Date().toISOString()
    const newItem = {
      userId,
      categoryId,
      productId,
      createdAt,
      imageUrl: `https://${bucketName}.s3.amazonaws.com/${productId}`,
      ...productRequest
    }
  
    return productAccess.createProduct(newItem)
  }
  
  export async function udpateProduct(productId: string, userId: string, updateProductRequest: UpdateProductRequest){
      return productAccess.updateProduct(productId, userId, updateProductRequest)
  }
  
  export async function deleteProduct(productId: string, userId: string){
      return productAccess.deleteProduct(productId, userId)
  }

  export async function getProductsByCategory(catId: string, userId: string){
    return productAccess.getProductsByCategory(catId, userId)
}