import Money from './money'

namespace Sales {
  export type Sale = {
    id: string
    product_id: string
    quantity: number
    price: Money.MoneyValue
  }
}
export default Sales
