import { AssetQueries } from './assets_queries'
import { useQuery } from '@tanstack/react-query'
import {
  LatestPeriodicAssetsRequest,
  PeriodicAssetValuesRequest,
} from './assets_requests'
import { PeriodicAssetsClient } from './periodic_assets_client'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const usePostLatestPeriodicAssets = (
  req: LatestPeriodicAssetsRequest
) => {
  return useQuery({
    queryKey: AssetQueries.LatestPeriodicAssets(req.period, req.type),
    queryFn: () => PeriodicAssetsClient.postLatestPeriodicAssets(req),
    onError: (error) => {
      console.log('failed to get latest periodic assets')
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

export const usePostPeriodicAssetsValues = (
  req: PeriodicAssetValuesRequest
) => {
  return useQuery({
    queryKey: AssetQueries.PeriodicAssetValues(req),
    queryFn: () => PeriodicAssetsClient.postPeriodicAssetValues(req),
    onError: (error) => {
      console.log('failed to get latest periodic assets')
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
