import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MetricsClient } from './metrics_client'
import { MetricsQueries } from './metrics_queries'
import Portfolio from '../../../models/portfolio'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetDashboardMetrics = (
  start: Date,
  end: Date,
  horizon: Portfolio.TimeHorizon
) => {
  return useQuery({
    queryKey: MetricsQueries.DashboardMetricsBetweenDates(start, end),
    queryFn: () =>
      MetricsClient.postDashboardMetrics({
        period: {
          start,
          end,
          timeHorizon: horizon,
        },
      }),
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
