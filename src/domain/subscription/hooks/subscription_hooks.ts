import { SubscriptionQueries } from './subscription_queries'
import { SubscriptionClient } from './subscription_client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { NewSubscriptionSessionRequest } from './subscription_request'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetMySubscription = () => {
  return useQuery({
    queryKey: SubscriptionQueries.MySubscription(),
    queryFn: () => SubscriptionClient.getMySubscription(),
    onError: (error) => {
      console.log('failed to get my subscirtion')
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

export const useSubscriptionSession = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (req: NewSubscriptionSessionRequest) =>
      SubscriptionClient.postSubscriptionSession(req),
    {
      ...defaultOptions,
      ...options,
      onSuccess: (resp) => {
        console.log('subscription session created')
        window.location.href = resp.url
        console.log(resp)
      },
      /*
            onSettled: () => {
                const toBeInvalidated = []
                const toBeRefetched = [SubscriptionQueries.MySubscription()]
                toBeInvalidated.forEach((q) => {
                    queryClient.invalidateQueries(q)
                })
                toBeRefetched.forEach((q) => {
                    queryClient.refetchQueries(q)
                })
            },

             */
      onError: (error) => {
        console.error(error)
      },
      retry: false,
    }
  )
}
