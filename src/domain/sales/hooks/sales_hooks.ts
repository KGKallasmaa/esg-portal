import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Sales from '../../../models/sales'
import { SalesClient } from './sales_client'
import { SaleQueries } from './sales_query'
import { NewSalesRequest, UpdateSalesRequest } from './sales_requests'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetSaleByProductId = (id: string) => {
  return useQuery({
    queryKey: SaleQueries.SaleByProductId(id),
    queryFn: () => SalesClient.getSaleByProductId(id),
    onError: (error) => {
      console.error('failed to get my sales', error)
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

export const useNewSale = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (params: { req: NewSalesRequest }) => SalesClient.postNewSale(params.req),
    {
      ...defaultOptions,
      ...options,
      onSettled: (sale: Sales.Sale) => {
        const toBeInvalidated = [SaleQueries.SaleByProductId(sale.product_id)]
        const toBeRefetched = []
        toBeInvalidated.forEach((q) => {
          queryClient.invalidateQueries(q)
        })
        toBeRefetched.forEach((q) => {
          queryClient.refetchQueries(q)
        })
      },
      onError: (error) => {
        console.error('new sales cration failed', error)
      },
      retry: false,
    }
  )
}

export const useUpdateSale = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (params: { id: string; req: UpdateSalesRequest }) =>
      SalesClient.putUpdateSale(params.id, params.req),
    {
      ...defaultOptions,
      ...options,
      onSettled: (sale: Sales.Sale) => {
        if (!sale) return
        const toBeInvalidated = [SaleQueries.SaleByProductId(sale.product_id)]
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

export const useDeleteSale = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation((id: string) => SalesClient.deleteSale(id), {
    ...defaultOptions,
    ...options,
    onSettled: (sale) => {
      if (!sale) return
      const toBeInvalidated = [SaleQueries.SaleByProductId(sale.product_id)]
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
  })
}
