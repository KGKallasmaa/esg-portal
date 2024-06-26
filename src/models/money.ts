namespace Money {
  export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CNY' | 'INR'
  export type MoneyValue = {
    amount: number
    currency: Currency
  }

  export type DatedMoneyValue = {
    date: Date
    value: MoneyValue
  }

  export type PeriodicMoneyValue = {
    start: Date
    end: Date
    value: MoneyValue
  }
}
export default Money
