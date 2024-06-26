import { useQuery } from '@tanstack/react-query'
import { PortfolioQueries } from './portfolio_queries'
import { PortfolioClient } from './portfolio_client'
import Portfolio from '../../../models/portfolio'
import Assets from '../../../models/assets'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetPortfolioValue = (
  period: Portfolio.Period,
  holdingTypes: Assets.AssetType[]
) => {
  return useQuery({
    queryKey: PortfolioQueries.PortfolioValue(period, holdingTypes),
    queryFn: () =>
      PortfolioClient.postPortfolioValue({
        period,
        holdingTypes,
      }),
    onError: (error) => {
      console.log('failed to get portfolio value')
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
