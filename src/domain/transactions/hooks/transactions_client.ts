import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import Transactions from '../../../models/transactions'
import {
  TransactionUpdateRequest,
  TransactionsFilter,
} from './transaction_requests'
import Integrations from '../../../models/integrations'

async function getTransactions(
  filter: TransactionsFilter
): Promise<Integrations.GroupedTransactions> {
  const { start, end, category, accountIds } = filter
  let path = `v1/transactions?start=${start.toISOString()}&end=${end.toISOString()}`
  if (category) {
    path = path.concat(`&category=${category}`)
  }
  if (accountIds) {
    path = path.concat(`&account_ids=${accountIds.join(',')}`)
  }
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getTransaction(id: string): Promise<Transactions.Transaction> {
  const path = `v1/transaction/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function putUpdateTransaction(
  id: string,
  request: TransactionUpdateRequest
): Promise<null> {
  const path = `v1/transaction/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, request)
}

async function deleteTransaction(id: string): Promise<null> {
  const path = `v1/transaction/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

async function deleteRecurringTransaction(id: string): Promise<null> {
  const path = `v1/recurring-transaction/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

export const TransactionsClient = {
  getTransactions,
  getTransaction,
  putUpdateTransaction,
  deleteTransaction,
  deleteRecurringTransaction,
}
