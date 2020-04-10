export interface Product {
  productId: string
  name: string
  unitPrice: number
  quantity: number
  createdAt: string
  sizeUnit: string
  userId: string
  categoryId: string
  upc?: string
  barcode?: string
  reorderPoint?: number
  restockPoint?: number
  vendor?: number
  imageUrl?: string
}
