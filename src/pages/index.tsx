import Head from 'next/head'

import { useUser } from '@auth0/nextjs-auth0/client'
import dynamic from 'next/dynamic'
import { BASE_URL } from '../config/url'
import Layout from '../components/navigation/Layout'
import { Metadata } from 'next'
import StaticLayout from '../domain/static/StaticLayout'

const LandingPage = dynamic(
  () => import('../domain/static/landingpage/Landingpage')
)
const DashboardContainer = dynamic(
  () => import('../domain/dashboard/DashboardPage')
)

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

export default function Home() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return null
  }

  const isUserLoggedIn = !isLoading && user !== undefined

  return (
    <>
      <Header />
      {isUserLoggedIn ? (
        <Layout>
          <DashboardContainer />
        </Layout>
      ) : (
        <StaticLayout>
          <LandingPage />
        </StaticLayout>
      )}
    </>
  )
}
function Header() {
  const title = 'Merlin: Your financial command center'
  const url = BASE_URL
  const description =
    'Merlin connects all your financial accounts into a single dashboard, giving you a complete overview of your wealth.'

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
    </Head>
  )
}
