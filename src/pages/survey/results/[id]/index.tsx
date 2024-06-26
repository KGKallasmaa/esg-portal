import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Home from '../../../index'
import { SurveyClient } from '../../../../domain/survey/hooks/survey_client'
import { SurveyQueries } from '../../../../domain/survey/hooks/survey_queries'
import SurveyResultsPage from '../../../../domain/survey/SurveyResultsPage'

export default function SurveyResultsScreen() {
  const router = useRouter()
  const surveyId = router.query.id ? router.query.id.toString() : null
  if (surveyId === null) {
    return <Home />
  }
  return <SurveyResultsPage surveyId={surveyId} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(SurveyQueries.SurveyResults(id), () =>
    SurveyClient.getSurveyResults(id)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
