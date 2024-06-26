import { BASE_URL } from '../../config/url'
import Head from 'next/head'
import React from 'react'
import Layout from '../../components/navigation/Layout'
import ToolsPage from '../../domain/studio/StudioPage'

export default function AdvisorScreen() {
  return (
    <>
      <Header />
      <Layout>
        <ToolsPage />
      </Layout>
    </>
  )
}

function Header() {
  const title = 'Your personalized financial advisor | Merlin'
  const url = BASE_URL + '/advisor'
  const description = 'Need help with your finances? Merlin is here to help.'

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
