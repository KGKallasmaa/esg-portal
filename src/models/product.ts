import Money from './money'

namespace Product {
  export type ProductState = 'draft' | 'active'

  export type Product = {
    id: string

    state: ProductState
    created_at: Date
    updated_at: Date
    producer_id: string
    details: {
      title: string
      barcode: string
      sales: {
        quantity: number
        value: Money.MoneyValue
      }
    }
  }
}

export default Product
