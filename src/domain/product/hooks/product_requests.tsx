export type NewProductRequest = {
  barcode: string
  name: string
  producer_id: string
}

export type UpdateProductRequest = {
    barcode: string
    name: string
  }