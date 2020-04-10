import * as uuid from 'uuid'

import { Category } from '../models/Category'
import { CategoryAccess } from '../dataLayer/categoriesAccess'
import { CreateCategoryRequest } from '../requests/CreateCategoryRequest'
import { UpdateCategoryRequest } from '../requests/UpdateCategoryRequest'


const categoryAccess = new CategoryAccess()

export async function getAllCategories(userId: string): Promise<Category[]> {
  return categoryAccess.getAllCategories(userId)
}

export async function createCategory(
  createCategoryRequest: CreateCategoryRequest,
  userId: string
): Promise<Category> {

  const categoryId = uuid.v4()

  return await categoryAccess.createCategory({
    categoryId: categoryId,
    userId: userId,
    name: createCategoryRequest.name,
    description: createCategoryRequest.description,
    createdAt: new Date().toISOString()
  })
}

export async function deleteCategory(catId: string, userId: string){
  return categoryAccess.deleteCategory(catId, userId)
}

export async function updateCategory(catId: string, userId: string, updateCategoryRequest: UpdateCategoryRequest){
  return categoryAccess.updateCategory(catId, userId, updateCategoryRequest)
}

export async function getCategoryById(catId: string, userId: string){
  return categoryAccess.getCategoryById(catId, userId)
}

