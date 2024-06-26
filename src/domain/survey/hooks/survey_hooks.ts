import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SurveyQueries } from './survey_queries'
import { SurveyClient } from './survey_client'
import Survey from '../../../models/survey'

const ONE_MINUTE = 60 * 1000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7

export const useGetSurveyById = (id: string) => {
  return useQuery({
    queryKey: SurveyQueries.Survey(id),
    queryFn: () => SurveyClient.getSurveyById(id),
    onError: (error) => {
      console.log('failed to survey results')
      console.error(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 5_000,
    enabled: id?.length > 0,
    retry: (failureCount, error) => {
      // @ts-ignore:next-line
      const statusCode = error?.response?.status
      console.log('useGetSurveyById error')
      console.log(error)
      return statusCode === 425 && failureCount < 5
    },
  })
}

export const useGetLatestUncompletedSurvey = (type: Survey.SurveyType) => {
  return useQuery({
    queryKey: SurveyQueries.LatestUncompletedSurvey(type),
    queryFn: () => SurveyClient.postLatestUncompletedSurvey(type),
    onError: (error) => {
      console.log('failed to get unanswered queries')
      console.log(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: ONE_MINUTE,
    retryDelay: 5_000,
    enabled: type?.length > 0,
    retry: 3,
  })
}

export const useAnswerSurveyMutation = (surveyId: string, options?: any) => {
  const queryClient = useQueryClient()
  const defaultOptions = {}

  return useMutation(
    (payload: Survey.NewAnswerRequest) =>
      SurveyClient.postAnswerSurvey(payload),
    {
      ...defaultOptions,
      ...options,
      onSettled: () => {
        const toBeInvalidated = [
          SurveyQueries.SurveyNextQuestion(surveyId),
          SurveyQueries.SurveyPreviousQuestion(surveyId),
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
        // toast.error('Profile update failed.')
        console.error(error)
      },
    }
  )
}

export const useGetPreviousSurveyQuestion = (id: string) => {
  return useQuery({
    queryKey: SurveyQueries.SurveyPreviousQuestion(id),
    queryFn: () => SurveyClient.getPreviousSurveyQuestion(id),
    onError: (error) => {
      console.log('failed to get unanswered queries')
      console.log(error)
    },
    staleTime: 0,
    cacheTime: 0,
    retryDelay: 5_000,
    retry: 3,
  })
}

export const useGetNextSurveyQuestion = (id: string) => {
  return useQuery({
    queryKey: SurveyQueries.SurveyNextQuestion(id),
    queryFn: () => SurveyClient.getNextSurveyQuestion(id),
    onError: (error) => {
      console.log('failed to get unanswered queries')
      console.log(error)
    },
    staleTime: 0,
    cacheTime: 0,
    retryDelay: 5_000,
    retry: 3,
  })
}

export const useGetSurveyResults = (id: string) => {
  return useQuery({
    queryKey: SurveyQueries.SurveyResults(id),
    queryFn: () => SurveyClient.getSurveyResults(id),
    onError: (error) => {
      console.log('failed to survey results')
      console.log(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 10 * ONE_MINUTE,
    retryDelay: 2_000,
    enabled: id?.length > 0,
    retry: (failureCount, error) => {
      // Check if the error code is 425 and limit the retries to 5
      // @ts-ignore:next-line
      const statusCode = error?.response?.status
      if (statusCode === 404) {
        return false
      }
      console.log('useGetSurveyResults error')
      console.log(error)
      return failureCount < 3
    },
  })
}
export const useGetUncompletedSurveys = () => {
  return useQuery({
    queryKey: SurveyQueries.UnCompletedSurveys(),
    queryFn: () => SurveyClient.getAllUncompletedSurveys(),
    onError: (error) => {
      console.log('failed to get unanswered queries')
      console.log(error)
    },
    staleTime: ONE_WEEK,
    cacheTime: 1 * ONE_MINUTE,
    retryDelay: 5_000,
    retry: 3,
  })
}
