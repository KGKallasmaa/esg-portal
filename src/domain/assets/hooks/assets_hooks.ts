import { AssetQueries } from './assets_queries'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AssetsClient } from './assets_client'
import { NewSecurityRequest } from './assets_requests'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetAssetById = (id) => {
  return useQuery({
    queryKey: AssetQueries.AssetById(id),
    queryFn: () => AssetsClient.getAssetById(id),
    onError: (error) => {
      console.log('failed to get asset by Id')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    enabled: id !== undefined && id.length > 0,
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

export const useGetAssetsByIds = (ids) => {
  return useQuery({
    queryKey: AssetQueries.AssetByIds(ids),
    queryFn: () => AssetsClient.getAssetsByIds(ids),
    onError: (error) => {
      console.log('failed to get assets by Id')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    enabled: ids.length > 0,
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

export const useLatestSecurityPrice = (isin: string) => {
  return useQuery({
    queryKey: AssetQueries.LatestSecurityPrice(isin),
    queryFn: () => AssetsClient.getLatestSecurityPrice(isin),
    onError: (error) => {
      console.log('failed to get latest security price')
      console.error(error)
    },
    staleTime: ONE_DAY,
    cacheTime: ONE_HOUR,
    enabled: isin.length > 0,
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

export const useSecurityPriceAtDate = (isin: string, date: Date) => {
  return useQuery({
    queryKey: AssetQueries.SecurityPriceAtDate(isin, date),
    queryFn: () => AssetsClient.getSecurityPriceAtDate(isin, date),
    onError: (error) => {
      console.log('failed to get security price at date')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    enabled: isin.length > 0,
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

export const useNewSecurityAsset = (options?: any) => {
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
    (params: { req: NewSecurityRequest }) =>
      AssetsClient.postNewSecurity(params.req),
    {
      ...defaultOptions,
      ...options,
    }
  )
}

/*

export const useGetAssetsByFilter = (holdingId: string) => {
  return useQuery({
    queryKey: AssetQueries.AssetsByHoldingId(holdingId),
    queryFn: () => AssetsClient.getAssetsByFilter(holdingId),
    onError: (error) => {
      console.log('failed to get holdings')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 5_000,
    enabled: holdingId.length > 0,
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

export const useDeleteAssetById = (options?: any) => {
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
    (params: { id: string }) => AssetsClient.deleteAssetById(params.id),
    {
      ...defaultOptions,
      ...options,
    }
  )
}

export const useNewAsset = (type: Assets.AssetType, options?: any) => {
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
    (params: NewAssetReq) => AssetsClient.postNewAsset(type, params),
    {
      ...defaultOptions,
      ...options,
    }
  )
}
*/
