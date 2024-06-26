import Head from 'next/head'
import { BASE_URL } from '../config/url'
import TermsOfService from '../domain/static/TermsOfService'
import StaticLayout from '../domain/static/StaticLayout'

const seoMap = {
  title: 'Terms of Service | Merlin',
  description: 'View our terms of service',
  url: 'https://getmerlin.ai/tos',
  openGraphUrl: `${BASE_URL}/api/og/static?title=Terms%20Of%20Service`,
  twitterUrl: `${BASE_URL}/api/og/static?title=Terms%20Of%20Service`,
}

export default function TosScreen() {
  const { title, description, url, openGraphUrl, twitterUrl } = seoMap
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={openGraphUrl} />
        <meta name="twitter:image" content={twitterUrl} />
      </Head>
      <StaticLayout>
        <TermsOfService />
      </StaticLayout>
    </>
  )
}
