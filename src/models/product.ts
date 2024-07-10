namespace Product {
  export type ProductState = 'draft' | 'active'

  export type Product = {
    id: string
    title: string
    description: string
    state: ProductState
    created_at: Date
    updated_at: Date
    producer_id: string
    barcode: string
  }
}

export default Product
