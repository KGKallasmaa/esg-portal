import { BASE_URL } from '../config/url'
import Head from 'next/head'
import React from 'react'
import Layout from '../components/navigation/Layout'
import SettingsPage from '../domain/settings/SettingsPage'

export default function cashflowScreen() {
  return (
    <>
      <Header />
      <Layout>
        <SettingsPage />
      </Layout>
    </>
  )
}

function Header() {
  const title = 'Your settings | Merlin'
  const url = BASE_URL + '/settings'
  const description = 'Customize your excpierience'

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
