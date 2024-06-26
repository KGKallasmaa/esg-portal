import Head from 'next/head'
import Survey from '../../models/survey'
import { BASE_URL } from '../../config/url'
function SurveyResultsHeader({
  surveyId,
  surveyType,
}: {
  surveyId: string
  surveyType: Survey.SurveyType | undefined
}) {
  const { title, description } = titleAndDescription(surveyType)
  const url = `https://${BASE_URL}/survey/results/${surveyId}`
  const ogImageURL = `${BASE_URL}/api/og/survey?text=${encodeURI(title)}`
  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImageURL} />
      <meta name="twitter:image" content={ogImageURL} />
    </Head>
  )
}

function titleAndDescription(surveyType: Survey.SurveyType | undefined) {
  switch (surveyType) {
    case 'initial_financial_aspirations':
      return {
        title: 'Financial aspiration survey results | Merlin',
        description: 'See the results of the financial aspiration survey',
      }
    default:
      console.error('Unknown survey type: ' + surveyType)
      return {
        title: 'Survey results | Merlin',
        description: 'See the results of the survey',
      }
  }
}

export default SurveyResultsHeader
