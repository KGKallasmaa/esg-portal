import Money from './money'

namespace Studio {
  export type Frequency =
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'quarterly'
    | 'yearly'

  export type AssetCategory = 'stocks' | 'bonds' | 'real_estate' | 'cash'

  export type InitalAsset = {
    id: string
    title: string
    description?: string
    category: AssetCategory
    date: Date
    value: Money.MoneyValue
  }

  export type OneTimeInvestment = {
    id: string
    category: AssetCategory
    date: Date
    value: Money.MoneyValue
  }

  export type RecurringInvestment = {
    id: string
    category: AssetCategory
    firstDate: Date
    endDate: Date | null
    frequency: Frequency
    value: Money.MoneyValue
  }

  export type Investments = {
    oneTimeInvestments: OneTimeInvestment[]
    recurringInvestments: RecurringInvestment[]
  }

  export type OneTimeIncome = {
    id: string
    title: string
    description?: string
    category: string
    date: Date
    value: Money.MoneyValue
  }

  export type RecurringIncome = {
    id: string
    title: string
    description?: string
    category: string
    firstDate: Date
    endDate: Date | null
    frequency: Frequency
    value: Money.MoneyValue
  }

  export type Incomes = {
    oneTimeIncomes: OneTimeIncome[]
    recurringIncomes: RecurringIncome[]
  }

  export type OneTimeExpense = {
    id: string
    title: string
    description?: string
    category: string
    date: Date
    value: Money.MoneyValue
  }

  export type RecurringExpense = {
    id: string
    title: string
    description?: string
    category: string
    firstDate: Date
    endDate: Date | null
    value: Money.MoneyValue
    frequency: Frequency
  }

  export type Expenses = {
    oneTimeExpenses: OneTimeExpense[]
    recurringExpenses: RecurringExpense[]
  }

  export type RetirementPlan = {
    id: string
    userId: string
    name: string
    createdAt: string
    retirementStartDate: Date
    retirementEndDate: Date
    currency: Money.Currency

    initialAssets: InitalAsset[]
    investments: Investments
    incomes: Incomes
    expenses: Expenses

    totalWorth: Money.DatedMoneyValue[]
  }
}
export default Studio
