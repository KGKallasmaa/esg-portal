import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProductClient } from './product_client'
import { ProductQueries } from './product_query'
import { NewProductRequest, UpdateProductRequest } from './product_requests'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ProductQueries.Product(id),
    queryFn: () => ProductClient.getProduct(id),
    onError: (error) => {
      console.log('failed to get my settings')
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

export const useGetProductsByProducerId = (id: string) => {
  return useQuery({
    queryKey: ProductQueries.ProducerProducts(id),
    queryFn: () => ProductClient.getProductsByProducerId(id),
    onError: (error) => {
      console.error('failed to get producer products', error)
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
    enabled: !!id,
  })
}

export const useNewProduct = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (req: NewProductRequest) => ProductClient.postNewProduct(req),
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

export const useUpdateProduct = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (params: { id: string; req: UpdateProductRequest }) =>
      ProductClient.putUpdatProduct(params.id, params.req),
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

export const useDeleteProduct = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation((id: string) => ProductClient.deleteProduct(id), {
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
    retry: true,
  })
}
