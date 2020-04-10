export interface UpdateProductRequest {
    productId: string
    upc?: string
    name: string
    unitPrice: number
    categoryId: string
    quantity: number
    sizeUnit: string
    vendor?: number
    barcode?: string
    reorderPoint?: number
    restockPoint?: number
  }
  