import { useGetSurveyById, useGetSurveyResults } from './hooks/survey_hooks'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '../../components/Logo'

const FullLoadingScreen = dynamic(
  () => import('../../components/FullLoadingScreen')
)
const ErrorScreen = dynamic(() => import('../../components/ErrorScreen'))
const SurveyResultsHeader = dynamic(() => import('./SurveyResultsHeader'))

function SurveyResultsPage({ surveyId }: { surveyId: string }) {
  const { data, isLoading, isError } = useGetSurveyResults(surveyId)
  const { data: survey, error } = useGetSurveyById(surveyId)

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading survey results | Merlin</title>
        </Head>
        <FullLoadingScreen />
      </>
    )
  }

  if (isError || !data) {
    return (
      <ErrorScreen
        title={'Failed survey result'}
        message={'We are sorry'}
        description={'Something went wrong with getting your survey result'}
      />
    )
  }

  const { result } = data
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pt-2 dark:bg-gray-800 lg:pt-4">
      {survey && (
        <SurveyResultsHeader surveyId={surveyId} surveyType={survey?.type} />
      )}
      <div className="flex-grow">
        <div className="flex h-full items-center justify-center">
          <div className="max-w-7xl px-4 text-justify sm:px-6 lg:px-8">
            <Logo className="mx-auto mb-3 h-12 w-auto" />
            <div className="mx-auto max-w-4xl text-center">
              <h3
                className={`text-1xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl`}
              >
                Financial Aspiration Survey Results
              </h3>
              <p
                className={`mt-3 text-left text-xl text-gray-500 dark:text-gray-300 sm:mt-4`}
              >
                {JSON.stringify(result)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CallToAction />
    </div>
  )
}

function CallToAction() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-primary-darker">Need more details?</span>
          <span className="block text-primary">Join Merlin today</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/login">
              <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-5 py-3 text-base font-medium text-white hover:bg-primary-darker">
                Get started
              </button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link href="/contact">
              <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-primary hover:bg-primary-darker hover:text-white">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SurveyResultsPage
