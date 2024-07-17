import Money from '../../../models/money'

export type NewProductRequest = {
  barcode: string
  title: string
  producer_id: string
}

export type UpdateProductDetailsRequest = {
  barcode: string
  title: string
  sales: {
    quantity: number
    value: Money.MoneyValue
  }
}
