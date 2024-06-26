import { useQuery } from '@tanstack/react-query'
import { ArticlesQueries } from './articles_queries'
import { ArticlesClient } from './articles_client'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetTopArticles = () => {
  return useQuery({
    queryKey: ArticlesQueries.TopArticles(),
    queryFn: () => ArticlesClient.getTopArticles(),
    onError: (error) => {
      console.log('failed to get top articles')
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

// TODO: change the query
export const useGetMyStockPortfolioArticles = () => {
  return useQuery({
    queryKey: ArticlesQueries.TopArticles(),
    queryFn: () => ArticlesClient.getTopArticles(),
    onError: (error) => {
      console.log('failed to get top articles')
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
