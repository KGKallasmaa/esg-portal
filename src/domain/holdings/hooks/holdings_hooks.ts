import { useQuery } from '@tanstack/react-query'
import { HoldingsClient } from './holdings_client'
import { HoldingQueries } from './holding_queries'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetHoldingById = (id) => {
  return useQuery({
    queryKey: HoldingQueries.HoldingById(id),
    queryFn: () => HoldingsClient.getHoldingById(id),
    onError: (error) => {
      console.log('failed to get holding by Id')
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

export const useGetHoldingsByIds = (ids) => {
  return useQuery({
    queryKey: HoldingQueries.HoldingsByIds(ids),
    queryFn: () => HoldingsClient.getHoldingsByIds(ids),
    onError: (error) => {
      console.log('failed to get holdings by ids')
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
