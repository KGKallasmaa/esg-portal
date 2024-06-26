BudgetPage

import Head from 'next/head'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Metadata } from 'next'
import { BASE_URL } from '../config/url'
import StaticLayout from '../domain/static/StaticLayout'
import BudgetPage from '../domain/static/budget/BudgetPage'

export const metadata: Metadata = {
  openGraph: {
    title: 'Merlin',
    description:
      'Merlin, your AI copilot for financial planning, investments, and tax optimization. Simplify your wealth management with personalized insights',
    url: 'https:/getmerlin.ai',
    siteName: 'Merlin',
    images: [
      {
        url: 'https://storage.googleapis.com/merlin-assets/twitter/merlin_twitter.png',
        width: 1600,
        height: 900,
        alt: 'Merlin AI image',
      },
      {
        url: 'https://storage.googleapis.com/merlin-assets/open_graph/merlin_opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Merlin AI image',
      },
    ],
    type: 'website',
  },
}

// TODO: add twitter OG, facebook OG, and store it in cloudfair

export default function Budget() {
  return (
    <>
      <Header />
      <StaticLayout>
        <BudgetPage />
      </StaticLayout>
    </>
  )
}
function Header() {
  const title = 'Budget managment application | Merlin'
  const url = BASE_URL
  const description = 'I AM MISSING'

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
    </Head>
  )
}
