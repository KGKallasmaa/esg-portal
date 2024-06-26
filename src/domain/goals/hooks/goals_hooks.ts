import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GoalsClient } from './goals_client'
import Goals from '../../../models/goals'
import { GoalQueries } from './goals_queries'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetGoalById = (id) => {
  return useQuery({
    queryKey: GoalQueries.GoalById(id),
    queryFn: () => GoalsClient.getGoalById(id),
    onError: (error) => {
      console.log('failed to get my gols')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 5_000,
    //   enabled:id.length > 0,
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

export const useGetMyGoals = () => {
  return useQuery({
    queryKey: GoalQueries.MyGoals(),
    queryFn: () => GoalsClient.getMyGoals(),
    onError: (error) => {
      console.log('failed to get my gols')
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

export const useGetGoalPlan = (id) => {
  return useQuery({
    queryKey: GoalQueries.MyGoalPlan(id),
    queryFn: () => GoalsClient.getGoalPlan(id),
    onError: (error) => {
      console.log('failed to get my goal plan')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    enabled: id.length > 0,
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

export const useNewGoal = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (goalType: Goals.GoalType) => GoalsClient.postNewGoal(goalType),
    {
      ...defaultOptions,
      ...options,
      onSettled: () => {
        const toBeInvalidated = [GoalQueries.MyGoals()]
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

export const useUpdateGoal = (options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation((goal: Goals.Goal) => GoalsClient.putUpdateGoal(goal), {
    ...defaultOptions,
    ...options,
    onSettled: () => {
      const toBeInvalidated = [GoalQueries.MyGoals()]
      //   const toBeInvalidated = [GoalQueries.MyGoals(),GoalQueries.MyGoalPlan()]
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
