import Money from './money'
import Transactions from './transactions'

namespace Cashflow {
  export type CategoryWiseFinancialBreakdownItem = {
    category: string
    money: Money.MoneyValue
    percent: number
  }
  export type CategoryWiseFinancialBreakdown = {
    total: Money.MoneyValue
    items: CategoryWiseFinancialBreakdownItem[]
  }

  type FinancialSummary = {
    total: {
      income: Money.MoneyValue
      expenses: Money.MoneyValue
    }
    change: {
      income: {
        money: Money.MoneyValue
        percent: number
      } | null
      expenses: {
        money: Money.MoneyValue
        percent: number
      } | null
    }
  }

  type Breakdown = {
    income: {
      topCategoryBreakdown: CategoryWiseFinancialBreakdown
      detailedCategoryBreakdown: CategoryWiseFinancialBreakdown
      recurringTransactions: Transactions.RecurringTransaction[]
    }
    expenses: {
      topCategoryBreakdown: CategoryWiseFinancialBreakdown
      detailedCategoryBreakdown: CategoryWiseFinancialBreakdown
      recurringTransactions: Transactions.RecurringTransaction[]
    }
    combined: {
      topCategoryBreakdown: CategoryWiseFinancialBreakdown
      detailedCategoryBreakdown: CategoryWiseFinancialBreakdown
      recurringTransactions: Transactions.RecurringTransaction[]
    }
  }

  type MoneyMovementOverview = {
    snakeGraph: [string, string, number][]
  }

  export type MultiCategoryCashflowInsights = {
    id: string
    userId: string
    moneyMovement: MoneyMovementOverview
    summary: FinancialSummary
    breakdown: Breakdown
  }

  export type SingleCategoryCashflowInsights = {
    id: string
    userId: string
    summary: FinancialSummary
    moneyMovement: MoneyMovementOverview
    expiresAt?: Date
  }
}

export default Cashflow
