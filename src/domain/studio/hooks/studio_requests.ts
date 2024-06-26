import Money from '../../../models/money'
import Studio from '../../../models/studio'

export type retirementDetailsUpdateRequest = {
  retirementStartDate?: string
  retirementEndDate?: string
}
export type newOneTimeExpenseRequest = {
  title: string
  description?: string
  category: string
  date: string
  value: Money.MoneyValue
}
export type updateOneTimeExpenseRequest = {
  title?: string
  description?: string
  category?: string
  date?: string
  value?: Money.MoneyValue
}
export type newRecurringExpenseRequest = {
  title: string
  description?: string
  category: string
  firstDate: string
  endDate: string | null
  value: Money.MoneyValue
  frequency: Studio.Frequency
}

export type updateRecurringExpenseRequest = {
  title?: string
  description?: string
  category?: string
  firstDate?: string
  endDate?: string | null
  value?: Money.MoneyValue
  frequency?: Studio.Frequency
}

export type newOneTimeIncomeRequest = {
  title: string
  description?: string
  category: string
  date: string
  value: Money.MoneyValue
}
export type updateOneTimeIncomeRequest = {
  category?: string
  date?: string
  value?: Money.MoneyValue
}
export type newRecurringIncomeRequest = {
  title: string
  description?: string
  category: string
  firstDate: string
  endDate: string | null
  frequency: Studio.Frequency
  value: Money.MoneyValue
}
export type updateRecurringIncomeRequest = {
  category?: string
  firstDate?: string
  endDate?: string | null
  frequency?: Studio.Frequency
  value?: Money.MoneyValue
}

export type newOneTimeInvestmentRequest = {
  category: Studio.AssetCategory
  date: string
  value: Money.MoneyValue
}

export type updateOneTimeInvestmentRequest = {
  category?: Studio.AssetCategory
  date?: string
  value?: Money.MoneyValue
}

export type newRecurringInvestmentRequest = {
  title: string
  description?: string
  category: Studio.AssetCategory
  firstDate: string
  endDate: string | null
  frequency: Studio.Frequency
  value: Money.MoneyValue
}
export type updateRecurringInvestmentRequest = {
  category?: Studio.AssetCategory
  firstDate?: string
  endDate?: string | null
  frequency?: Studio.Frequency
  value?: Money.MoneyValue
}

export type newInitialAssetRequest = {
  title: string
  description?: string
  category: Studio.AssetCategory
  value: Money.MoneyValue
  date: string
}
export type updateInitialAssetRequest = {
  name?: string
  description?: string
  category?: Studio.AssetCategory
  value?: Money.MoneyValue
}
