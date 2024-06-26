import { useQuery } from '@tanstack/react-query'
import { CashflowClient } from './cashflow_client'
import { CashflowQueries } from './cashflow_queries'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetCashflowInsights = (
  start: Date,
  end: Date,
  categories: string[]
) => {
  return useQuery({
    queryKey: CashflowQueries.Cashflow(start, end),
    queryFn: () =>
      CashflowClient.getMultiCategoryInsights(start, end, categories),
    onError: (error) => {
      console.log('failed to get transactions')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    enabled: categories && categories.length > 0,
    retryDelay: 5_000,
    retry: (failureCount, error) => {
      // @ts-ignore:next-line
      const statusCode = error?.response?.status
      if (statusCode === 401) {
        return false
      }
      return failureCount < 3
    },
  })
}

export const useGetSingleCategoryCashflowInsights = (
  category: string,
  start: Date,
  end: Date
) => {
  return useQuery({
    queryKey: CashflowQueries.SingleCategoryCashflow(category, start, end),
    queryFn: () =>
      CashflowClient.getSingleCategoryInsights(start, end, category),
    onError: (error) => {
      console.log('failed to get transactions')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 5_000,
    retry: (failureCount, error) => {
      // @ts-ignore:next-line
      const statusCode = error?.response?.status
      if (statusCode === 401) {
        return false
      }
      return failureCount < 3
    },
  })
}

export const useGetTransactionCategories = (start: Date, end: Date) => {
  return useQuery({
    queryKey: CashflowQueries.TransactionCategories(start, end),
    queryFn: () => CashflowClient.getTransactionCategories(start, end),
    onError: (error) => {
      console.log('failed to get transactions')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 5_000,
    retry: (failureCount, error) => {
      // @ts-ignore:next-line
      const statusCode = error?.response?.status
      if (statusCode === 401) {
        return false
      }
      return failureCount < 3
    },
  })
}
