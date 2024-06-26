import Head from 'next/head'
import React from 'react'
import GoalsOverview from '../../../domain/goals/GoalsOverview'
import Layout from '../../../components/navigation/Layout'
import { BASE_URL } from '../../../config/url'

export default function GoalsScreen() {
  return (
    <>
      <Header />
      <Layout>
        <GoalsOverview />
      </Layout>
    </>
  )
}

function Header() {
  const title = 'Your goals | Merlin'
  const url = BASE_URL + '/goals'
  const description = 'Your financial goals'

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
