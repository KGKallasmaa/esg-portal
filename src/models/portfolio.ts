import Money from './money'

namespace Portfolio {
  export type TimeHorizon =
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'ytd'
    | 'year'
    | '5-years'
    | '10-years'
    | 'all'

  export type Period = {
    start: Date
    end: Date
    timeHorizon: TimeHorizon
  }

  export type Change = {
    money: Money.MoneyValue
    percent: number
  }

  export type Performance = {
    start: string
    end: string
    oldValue?: Money.MoneyValue
    newValue?: Money.MoneyValue
    change?: Change
  }

  export type PerformanceChanges = {
    securities: Performance
    accounts: Performance
    total: Performance
  }

  type PeriodicValueDetails = {
    securityValues?: Record<string, Money.MoneyValue>
    accountValues?: Record<string, Money.MoneyValue>
  }

  type PeriodicValueTotals = {
    securities: Money.MoneyValue
    accounts: Money.MoneyValue
    totalValue: Money.MoneyValue
  }

  export type ValueComponents = {
    period: Period
    details: PeriodicValueDetails
    totals: PeriodicValueTotals
    changes: PerformanceChanges
  }

  export type PortfolioValue = {
    periodic?: ValueComponents[]
    total?: ValueComponents
  }
}
export default Portfolio
