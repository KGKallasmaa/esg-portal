import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  TransactionUpdateRequest,
  TransactionsFilter,
} from './transaction_requests'
import { TransactionsClient } from './transactions_client'
import { TransactionQueries } from './transactions_query'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetTransaction = (id) => {
  return useQuery({
    queryKey: TransactionQueries.Transaction(id),
    queryFn: () => TransactionsClient.getTransaction(id),
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

export const useGetTransactions = (filter: TransactionsFilter) => {
  return useQuery({
    queryKey: TransactionQueries.Transactions(filter),
    queryFn: () => TransactionsClient.getTransactions(filter),
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

export const useUpdateTransaction = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (params: { id: string; request: TransactionUpdateRequest }) =>
      TransactionsClient.putUpdateTransaction(params.id, params.request),
    {
      ...defaultOptions,
      ...options,
      onSettled: () => {
        const toBeInvalidated = []
        const toBeRefetched = []
        toBeInvalidated.forEach((q) => {
          queryClient.invalidateQueries(q)
        })
        toBeRefetched.forEach((q) => {
          queryClient.refetchQueries(q)
        })
      },
      onError: (error) => {
        // toast.error('Profile update failed.')
        console.error(error)
      },
      retry: false,
    }
  )
}

export const useDeleteTransaction = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation((id: string) => TransactionsClient.deleteTransaction(id), {
    ...defaultOptions,
    ...options,
    onSettled: () => {
      const toBeInvalidated = []
      const toBeRefetched = []
      toBeInvalidated.forEach((q) => {
        queryClient.invalidateQueries(q)
      })
      toBeRefetched.forEach((q) => {
        queryClient.refetchQueries(q)
      })
    },
    onError: (error) => {
      // toast.error('Profile update failed.')
      console.error(error)
    },
    retry: false,
  })
}

export const useDeleteRecurringTransaction = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (id: string) => TransactionsClient.deleteRecurringTransaction(id),
    {
      ...defaultOptions,
      ...options,
      onSettled: () => {
        const toBeInvalidated = []
        const toBeRefetched = []
        toBeInvalidated.forEach((q) => {
          queryClient.invalidateQueries(q)
        })
        toBeRefetched.forEach((q) => {
          queryClient.refetchQueries(q)
        })
      },
      onError: (error) => {
        // toast.error('Profile update failed.')
        console.error(error)
      },
      retry: false,
    }
  )
}
