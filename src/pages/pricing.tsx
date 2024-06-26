StaticLayout

import Head from 'next/head'
import { BASE_URL } from '../config/url'
import StaticLayout from '../domain/static/StaticLayout'
import Pricing from '../domain/static/Pricing'

const seoMap = {
  title: 'Pricing | Merlin',
  description: 'View how we price our services',
  url: 'https://getmerlin.ai/pricing',
  openGraphUrl: `${BASE_URL}/api/og/static?title=Pricing`,
  twitterUrl: `${BASE_URL}/api/og/static?title=Pricing`,
}

export default function PricingScreen() {
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
        <Pricing />
      </StaticLayout>
    </>
  )
}
