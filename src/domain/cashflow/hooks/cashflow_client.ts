import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import Integrations from '../../../models/integrations'
import Cashflow from '../../../models/cashflow'

async function getMultiCategoryInsights(
  start: Date,
  end: Date,
  categories: string[]
): Promise<Cashflow.MultiCategoryCashflowInsights> {
  const path = `v1/cashflow/cashflow?start=${start.toISOString()}&end=${end.toISOString()}&multi=true&categories=${categories.join(
    ','
  )}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getSingleCategoryInsights(
  start: Date,
  end: Date,
  category: string
): Promise<Cashflow.SingleCategoryCashflowInsights> {
  const path = `v1/cashflow/cashflow?start=${start.toISOString()}&end=${end.toISOString()}&multi=false&category=${category}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getTransactionCategories(
  start: Date,
  end: Date
): Promise<string[]> {
  const path = `v1/cashflow/transaction-categories?start=${start.toISOString()}&end=${end.toISOString()}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

export const CashflowClient = {
  getMultiCategoryInsights,
  getSingleCategoryInsights,
  getTransactionCategories,
}
