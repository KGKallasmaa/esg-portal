import { useRouter } from 'next/router'
import { BASE_URL } from '../../../../config/url'
import RetirementDetailedPlanPage from '../../../../domain/studio/retirement/RetirementDetailedPlanPage'
import Layout from '../../../../components/navigation/Layout'
import Head from 'next/head'

export default function StudioDetailsPage() {
  const router = useRouter()
  const typee = router.query.type ? router.query.type.toString() : null
  if (typee == null) {
    return null
  }
  switch (typee.toUpperCase()) {
    case 'RETIREMENT':
      const id = router.query.id ? router.query.id.toString() : null
      if (id == null) {
        return null
      }
      const url = BASE_URL + `/studio/retirement/${id}`

      return (
        <>
          <Header
            title={'Detailed retirmenet plan'}
            url={url}
            description={'View your detailed retirmenet plan'}
          />
          <Layout>
            <RetirementDetailedPlanPage id={id}></RetirementDetailedPlanPage>
          </Layout>
        </>
      )
    default:
      return null
  }
}

function Header({
  title,
  url,
  description,
}: {
  title: string
  url: string
  description: string
}) {
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
    </Head>
  )
}
