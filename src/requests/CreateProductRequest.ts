export interface CreateProductRequest {
    upc?: string
    name: string
    unitPrice: number
    categoryId: string
    quantity: number
    sizeUnit: string
    restockPoint?: number
  }
  