import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Money from '../../../models/money'
import Studio from '../../../models/studio'
import {
  newInitialAssetRequest,
  newOneTimeExpenseRequest,
  newOneTimeIncomeRequest,
  newOneTimeInvestmentRequest,
  newRecurringExpenseRequest,
  newRecurringIncomeRequest,
  newRecurringInvestmentRequest,
  retirementDetailsUpdateRequest,
  updateInitialAssetRequest,
  updateOneTimeExpenseRequest,
  updateOneTimeIncomeRequest,
  updateOneTimeInvestmentRequest,
  updateRecurringExpenseRequest,
  updateRecurringIncomeRequest,
  updateRecurringInvestmentRequest,
} from './studio_requests'

async function getRetirementPlans(): Promise<Studio.RetirementPlan[]> {
  const path = `/v1/studio/retirement-plans`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getRetirementPlanById(
  id: string
): Promise<Studio.RetirementPlan> {
  const path = `/v1/studio/retirement-plans/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postNewDefaultRetirementPlan(): Promise<null> {
  const path = `v1/studio/retirement-plans`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true)
}

async function deleteRetirementPlanById(id: string): Promise<null> {
  const path = `v1/studio/retirement-plans/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function putUpdateRetirementDetails(
  id: string,
  retirementStartDate?: Date,
  retirementEndDate?: Date
): Promise<null> {
  const payload: retirementDetailsUpdateRequest = {
    retirementStartDate: retirementStartDate
      ? retirementStartDate.toISOString()
      : undefined,
    retirementEndDate: retirementEndDate
      ? retirementEndDate.toISOString()
      : undefined,
  }
  const path = `v1/studio/retirement-plans/${id}/details`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function postAddInitalAsset(
  id: string,
  title: string,
  description: string,
  category: Studio.AssetCategory,
  value: Money.MoneyValue,
  date: Date
): Promise<null> {
  const payload: newInitialAssetRequest = {
    title: title,
    description: description,
    category: category,
    value: value,
    date: date.toISOString(),
  }
  const path = `v1/studio/retirement-plans/${id}/initial-asset`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}
async function putUpdateInitialAsset(
  planId: string,
  assetId: string,
  name?: string,
  description?: string,
  category?: Studio.AssetCategory,
  value?: Money.MoneyValue
): Promise<null> {
  const payload: updateInitialAssetRequest = {
    name,
    description,
    category,
    value,
  }
  const path = `v1/studio/retirement-plans/${planId}/initial-asset/${assetId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function deleteInitialAsset(
  planId: string,
  assetId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/initial-asset/${assetId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function postAddOneTimeIncome(
  id: string,
  title: string,
  category: string,
  date: Date,
  value: Money.MoneyValue,
  description?: string
): Promise<null> {
  const payload: newOneTimeIncomeRequest = {
    title: title,
    description: description,
    category: category,
    date: date.toISOString(),
    value: value,
  }
  const path = `v1/studio/retirement-plans/${id}/one-time-income`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}
async function postAddRecurringIncome(
  id: string,
  category: string,
  firstDate: Date,
  endDate: Date | null,
  frequency: Studio.Frequency,
  value: Money.MoneyValue,
  title: string,
  description?: string
): Promise<null> {
  const payload: newRecurringIncomeRequest = {
    title: title,
    description: description,
    category: category,
    firstDate: firstDate.toISOString(),
    endDate: endDate ? endDate.toISOString() : null,
    frequency: frequency,
    value: value,
  }
  const path = `v1/studio/retirement-plans/${id}/recurring-income`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}

async function putUpdateOneTimeIncome(
  planId: string,
  incomeId: string,
  category?: string,
  date?: Date,
  value?: Money.MoneyValue
): Promise<null> {
  const payload: updateOneTimeIncomeRequest = {
    category,
    date: date ? date.toISOString() : undefined,
    value,
  }
  const path = `v1/studio/retirement-plans/${planId}/one-time-income/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function putUpdateRecurringIncome(
  planId: string,
  incomeId: string,
  category?: string,
  firstDate?: Date,
  endDate?: Date | null,
  frequency?: Studio.Frequency,
  value?: Money.MoneyValue
): Promise<null> {
  const payload: updateRecurringIncomeRequest = {
    category,
    firstDate: firstDate ? firstDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : null,
    frequency,
    value,
  }
  const path = `v1/studio/retirement-plans/${planId}/recurring-income/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function deleteOneTimeIncome(
  planId: string,
  incomeId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/one-time-income/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function deleteRecurringIncome(
  planId: string,
  incomeId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/recurring-income/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function postAddOneTimeInvestment(
  id: string,
  category: Studio.AssetCategory,
  date: Date,
  value: Money.MoneyValue
): Promise<null> {
  const payload: newOneTimeInvestmentRequest = {
    category: category,
    date: date.toISOString(),
    value: value,
  }
  const path = `v1/studio/retirement-plans/${id}/one-time-investment`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}
async function postAddRecurringInvestment(
  id: string,
  title: string,
  category: Studio.AssetCategory,
  firstDate: Date,
  endDate: Date | null,
  frequency: Studio.Frequency,
  value: Money.MoneyValue,
  description?: string
): Promise<null> {
  const payload: newRecurringInvestmentRequest = {
    title: title,
    description: description,
    category: category,
    firstDate: firstDate.toISOString(),
    endDate: endDate ? endDate.toISOString() : null,
    frequency: frequency,
    value: value,
  }
  const path = `v1/studio/retirement-plans/${id}/recurring-investment`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}

async function putUpdateOneTimeInvestment(
  planId: string,
  incomeId: string,
  category?: Studio.AssetCategory,
  date?: Date,
  value?: Money.MoneyValue
): Promise<null> {
  const payload: updateOneTimeInvestmentRequest = {
    category,
    date: date ? date.toISOString() : undefined,
    value,
  }
  const path = `v1/studio/retirement-plans/${planId}/one-time-investment/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function putUpdateRecurringInvestment(
  planId: string,
  incomeId: string,
  category?: Studio.AssetCategory,
  firstDate?: Date,
  endDate?: Date | null,
  frequency?: Studio.Frequency,
  value?: Money.MoneyValue
): Promise<null> {
  const payload: updateRecurringInvestmentRequest = {
    category,
    firstDate: firstDate ? firstDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : null,
    frequency,
    value,
  }
  const path = `v1/studio/retirement-plans/${planId}/recurring-investment/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function deleteOneTimeInvestment(
  planId: string,
  incomeId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/one-time-investment/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function deleteRecurringInvestment(
  planId: string,
  incomeId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/recurring-investment/${incomeId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function postNewOneTimeExpense(
  id: string,
  title: string,
  description: string,
  category: string,
  date: Date,
  value: Money.MoneyValue
): Promise<null> {
  const payload: newOneTimeExpenseRequest = {
    title,
    description,
    category,
    date: date.toISOString(),
    value,
  }
  const path = `v1/studio/retirement-plans/${id}/one-time-expense`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}
async function postNewRecurringExpense(
  id: string,
  title: string,
  description: string,
  category: string,
  firstDate: Date,
  endDate: Date | null,
  value: Money.MoneyValue,
  frequency: Studio.Frequency
): Promise<null> {
  const payload: newRecurringExpenseRequest = {
    title: title,
    description: description,
    category: category,
    firstDate: firstDate.toISOString(),
    endDate: endDate ? endDate.toISOString() : null,
    value: value,
    frequency: frequency,
  }
  const path = `v1/studio/retirement-plans/${id}/recurring-expense`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}

async function putUpdateOneTimeExpense(
  planId: string,
  expenseId: string,
  title?: string,
  description?: string,
  category?: string,
  date?: Date,
  value?: Money.MoneyValue
): Promise<null> {
  const payload: updateOneTimeExpenseRequest = {
    title,
    description,
    category,
    date: date ? date?.toISOString() : undefined,
    value,
  }
  const path = `v1/studio/retirement-plans/${planId}/one-time-expense/${expenseId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function putUpdateRecurringExpense(
  planId: string,
  expenseId: string,
  title?: string,
  description?: string,
  category?: string,
  firstDate?: Date,
  endDate?: Date | null,
  value?: Money.MoneyValue,
  frequency?: Studio.Frequency
): Promise<null> {
  const payload: updateRecurringExpenseRequest = {
    title,
    description,
    category,
    firstDate: firstDate ? firstDate?.toISOString() : undefined,
    endDate: endDate ? endDate?.toISOString() : null,
    value,
    frequency,
  }
  const path = `v1/studio/retirement-plans/${planId}/recurring-expense/${expenseId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

async function deleteOneTimeExpense(
  planId: string,
  expenseId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/one-time-expense/${expenseId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}
async function deleteRecurringExpense(
  planId: string,
  expenseId: string
): Promise<null> {
  const path = `v1/studio/retirement-plans/${planId}/recurring-expense/${expenseId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true)
}

export const StudioClient = {
  getRetirementPlans,
  getRetirementPlanById,
  deleteRetirementPlanById,
  postNewDefaultRetirementPlan,
  putUpdateRetirementDetails,

  postAddInitalAsset,
  putUpdateInitialAsset,
  deleteInitialAsset,

  postAddOneTimeIncome,
  postAddRecurringIncome,
  putUpdateOneTimeIncome,
  putUpdateRecurringIncome,
  deleteOneTimeIncome,
  deleteRecurringIncome,

  postAddOneTimeInvestment,
  postAddRecurringInvestment,
  putUpdateOneTimeInvestment,
  putUpdateRecurringInvestment,
  deleteOneTimeInvestment,
  deleteRecurringInvestment,

  postNewOneTimeExpense,
  postNewRecurringExpense,
  putUpdateOneTimeExpense,
  putUpdateRecurringExpense,
  deleteOneTimeExpense,
  deleteRecurringExpense,
}
