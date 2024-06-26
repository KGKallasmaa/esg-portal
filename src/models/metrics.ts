import Money from './money'
import Portfolio from './portfolio'

namespace Metrics {
  export type MonetaryMetric = {
    value: Money.MoneyValue
    change: Portfolio.Change
  }
  export type DashboardMetrics = {
    netWorth: {
      securities: MonetaryMetric
      accounts: MonetaryMetric
      total: MonetaryMetric
    }
    income: MonetaryMetric
    expenses: MonetaryMetric
  }
}
export default Metrics
