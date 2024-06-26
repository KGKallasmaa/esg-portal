import { useRouter } from 'next/router'
import Layout from '../../../components/navigation/Layout'
import Head from 'next/head'
import React from 'react'
import { BASE_URL } from '../../../config/url'
import RetirementPage from '../../../domain/studio/retirement/RetirementPage'

const studioScreenMap = {
  RETIREMENT: {
    header: {
      title: 'Your personalized retirement advisor | Merlin',
      url: BASE_URL + '/studio/retirement',
      description: 'Need help with your finances? Merlin is here to help.',
    },
    body: <RetirementPage />,
  },
}
export default function DetailsScreen() {
  const router = useRouter()
  const advisorType = router.query.type ? router.query.type.toString() : null
  if (advisorType == null) {
    return null
  }
  if (!Object.keys(studioScreenMap).includes(advisorType.toUpperCase())) {
    return null
  }
  const { header, body } = studioScreenMap[advisorType.toUpperCase()]
  const { title, url, description } = header
  return (
    <>
      <Header title={title} url={url} description={description} />
      <Layout>{body}</Layout>
    </>
  )
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
