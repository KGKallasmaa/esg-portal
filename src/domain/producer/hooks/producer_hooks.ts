import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProducerClient } from './producer_client'
import { ProducerQueries } from './producer_query'
import Producer from '../../../models/producer'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetProducer = (id: string) => {
  return useQuery({
    queryKey: ProducerQueries.Producer(id),
    queryFn: () => ProducerClient.getProducer(id),
    onError: (error) => {
      console.error('failed to get producer', error)
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

export const useGetMyProducers = () => {
  return useQuery({
    queryKey: ProducerQueries.MyProducers(),
    queryFn: () => ProducerClient.getMyProducers(),
    onError: (error) => {
      console.error('failed to get my producers', error)
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

export const useNewProducer = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (params: { name: string }) =>
      ProducerClient.postCreateProducer({
        name: params.name,
      }),
    {
      ...defaultOptions,
      ...options,
      onSettled: () => {
        const toBeInvalidated = [ProducerQueries.MyProducers()]
        const toBeRefetched = []
        toBeInvalidated.forEach((q) => {
          queryClient.invalidateQueries(q)
        })
        toBeRefetched.forEach((q) => {
          queryClient.refetchQueries(q)
        })
      },
      onError: (error) => {
        console.error('failed to create producer', error)
      },
      retry: false,
    }
  )
}

export const useUpdateProducerEmmisions = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (params: {
      id: string
      scope1_value: number
      scope2_value: number
      scope3_value: number
    }) =>
      ProducerClient.putUpdateEmmisions(params.id, {
        scope1_kgco2e: params.scope1_value,
        scope2_kgco2e: params.scope2_value,
        scope3_kgco2e: params.scope3_value,
      }),
    {
      ...defaultOptions,
      ...options,
      onSettled: (producer: Producer.Producer) => {
        const toBeInvalidated = [
          ProducerQueries.Producer(producer.id),
          ProducerQueries.MyProducers(),
        ]
        const toBeRefetched = []
        toBeInvalidated.forEach((q) => {
          queryClient.invalidateQueries(q)
        })
        toBeRefetched.forEach((q) => {
          queryClient.refetchQueries(q)
        })
      },
      onError: (error) => {
        console.error('failed to update producer', error)
      },
      retry: false,
    }
  )
}

export const useDeleteProducer = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    // @ts-ignore:next-line
    (id) => ProducerClient.deleteProducer(id), {
    ...defaultOptions,
    ...options,
    onSettled: (producer: Producer.Producer) => {
      const toBeInvalidated = [
        ProducerQueries.Producer(producer.id),
        ProducerQueries.MyProducers(),
      ]
      const toBeRefetched = []
      toBeInvalidated.forEach((q) => {
        queryClient.invalidateQueries(q)
      })
      toBeRefetched.forEach((q) => {
        queryClient.refetchQueries(q)
      })
    },
    onError: (error) => {
      console.error('failed to delete producer', error)
    },
    retry: true,
  })
}