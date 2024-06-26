import { HoldingQueries } from './holding_queries'
import { HoldingsClient } from './holdings_client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetHoldingByID = (holdingID: string) => {
  return useQuery({
    queryKey: HoldingQueries.HoldingById(holdingID),
    queryFn: () => HoldingsClient.getHoldingById(holdingID),
    onError: (error) => {
      console.log('failed to get holdings')
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

export const useGetAllHoldings = (types) => {
  return useQuery({
    queryKey: HoldingQueries.AllHoldings(types),
    queryFn: () => HoldingsClient.getAllHoldings(types),
    onError: (error) => {
      console.log('failed to get holdings by ids')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 1_000,
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

/*
export const useGetCurrentHoldings = (start, end, types) => {
  return useQuery({
    queryKey: HoldingQueries.HoldingsBetweenDates(types, start, end),
    queryFn: () => HoldingsClient.getCurrentHoldings(types, start, end),
    onError: (error) => {
      console.log('failed to get holdings')
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
 */

export const useDeleteHoldingById = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {
    onSuccess: () => {
      const toInvalidateQueries = []
      const toRefreshQueries = []
      const toPreFetchQueries = []
      toInvalidateQueries.forEach((q) => {
        queryClient.invalidateQueries(q)
      })
      toRefreshQueries.forEach((q) => {
        queryClient.refetchQueries(q)
      })
      toPreFetchQueries.forEach((q) => {
        queryClient.prefetchQuery(q)
      })
    },
    onError: (e) => {
      const toInvalidateQueries = []
      const toRefreshQueries = []
      const toPreFetchQueries = []
      toInvalidateQueries.forEach((q) => {
        queryClient.invalidateQueries(q)
      })
      toRefreshQueries.forEach((q) => {
        queryClient.refetchQueries(q)
      })
      toPreFetchQueries.forEach((q) => {
        queryClient.prefetchQuery(q)
      })
      console.error(e)
    },
  }

  return useMutation(
    (params: { id: string }) => HoldingsClient.deleteHoldingById(params.id),
    {
      ...defaultOptions,
      ...options,
    }
  )
}
