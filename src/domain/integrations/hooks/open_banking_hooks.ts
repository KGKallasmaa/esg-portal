import { OpenBankingClient } from './open_banking_client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IntegrationQueries } from './integration_queries'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetLinkToken = () => {
  return useQuery({
    queryKey: IntegrationQueries.OpenBankingLinkToken(),
    queryFn: () => OpenBankingClient.getGenerateLinkToken(),
    onError: (error) => {
      console.log('failed to generate link token')
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

export const useGetOpenBankingStatus = () => {
  return useQuery({
    queryKey: IntegrationQueries.OpenBankingStatus(),
    queryFn: () => OpenBankingClient.getOpenBankingStatus(),
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
    refetchInterval: 300,
  })
}

export const useGivePublicAccessToken = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (token: string) => OpenBankingClient.postExchangePublicToken(token),
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
