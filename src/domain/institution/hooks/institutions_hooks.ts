import { useQuery } from '@tanstack/react-query'
import { InstitutionsClient } from './institutions_client'
import { InstitutionQueries } from './institutions_queries'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetInstitution = (id) => {
  return useQuery({
    queryKey: InstitutionQueries.Institution(id),
    queryFn: () => InstitutionsClient.getInstitution(id),
    onError: (error) => {
      console.log('failed to get institution')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 5_000,
    enabled: !!id,
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
