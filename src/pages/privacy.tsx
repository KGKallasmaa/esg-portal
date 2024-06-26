import Head from 'next/head'
import { BASE_URL } from '../config/url'
import Privacy from '../domain/static/Privacy'
import StaticLayout from '../domain/static/StaticLayout'

const seoMap = {
  title: 'Privacy | Merlin',
  description: 'View our privacy policy',
  url: 'https://getmerlin.ai/privacy',
  openGraphUrl: `${BASE_URL}/api/og/static?title=Privacy`,
  twitterUrl: `${BASE_URL}/api/og/static?title=Privacy`,
}

export default function PrivacyScreen() {
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
        <Privacy />
      </StaticLayout>
    </>
  )
}
