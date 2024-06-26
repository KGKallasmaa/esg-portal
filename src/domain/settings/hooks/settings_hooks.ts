import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SettingsClient } from './settings_client'
import { SettingsQueries } from './settings_queries'
import Settings from '../../../models/settings'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetMySettings = () => {
  return useQuery({
    queryKey: SettingsQueries.MySettings(),
    queryFn: () => SettingsClient.getMySettings(),
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

export const useUpdateGeneralSettings = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (general: Settings.General) =>
      SettingsClient.putUpdateGeneralSettings(general),
    {
      ...defaultOptions,
      ...options,
      onSettled: () => {
        const toBeInvalidated = [SettingsQueries.MySettings()]
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
