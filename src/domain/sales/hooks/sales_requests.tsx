import Money from '../../../models/money'

export type UpdateSalesRequest = {
  quantity: number
  total: Money.MoneyValue
}

export type NewSalesRequest = {
  product_id: string
  quantity: number
  total: Money.MoneyValue
}
