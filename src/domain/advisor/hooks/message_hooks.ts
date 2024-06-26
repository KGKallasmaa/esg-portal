import { MessageClient } from './message_client'
import { useQuery } from '@tanstack/react-query'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetChatMessages = (chatID: string | null) => {
  return useQuery({
    // queryKey: CashflowQueries.Transactions(start, end, category),
    // @ts-ignore
    queryFn: () => MessageClient.getChatMessages(chatID),
    onError: (error) => {
      console.log('failed to get transactions')
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
    enabled: chatID !== null && chatID.length > 0,
  })
}
