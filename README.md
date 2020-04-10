# Inventory-management
APIs for Inventory System that helps to manage items by categories.
It als has a feature to add item image, move items between categories/groups

## Service Information
service: serverless-inventory-app

#Endpoints:
  GET - [apiEndpoint]/categories
  POST - [apiEndpoint]/categories
  PATCH - [apiEndpoint]/categories/{categoryId}
  DELETE - [apiEndpoint]/categories/{categoryId}
  GET - [apiEndpoint]/categories/{categoryId}/products
  POST - [apiEndpoint]/categories/{categoryId}/products
  PATCH - [apiEndpoint]/categories/{categoryId}/products/{productId}
  DELETE - [apiEndpoint]/categories/{categoryId}/products/{productId}
  GET - [apiEndpoint]products
#Functions:
  Auth: serverless-inventory-app-dev-Auth
  GetCategories: serverless-inventory-app-dev-GetCategories
  CreateCategory: serverless-inventory-app-dev-CreateCategory
  UpdateCategory: serverless-inventory-app-dev-UpdateCategory
  DeleteCategory: serverless-inventory-app-dev-DeleteCategory
  GetProducts: serverless-inventory-app-dev-GetProducts
  CreateProduct: serverless-inventory-app-dev-CreateProduct
  UpdateProduct: serverless-inventory-app-dev-UpdateProduct
  DeleteProduct: serverless-inventory-app-dev-DeleteProduct
  GetAllProducts: serverless-inventory-app-dev-GetAllProducts



## To deploy an application run the following commands:

`npm install`
`sls deploy -v`
