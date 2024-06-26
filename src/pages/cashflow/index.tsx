import { BASE_URL } from '../../config/url'
import Head from 'next/head'
import React from 'react'
import Layout from '../../components/navigation/Layout'
import CashflowPage from '../../domain/cashflow/CashflowPage'

export default function cashflowScreen() {
  return (
    <>
      <Header />
      <Layout>
        <CashflowPage />
      </Layout>
    </>
  )
}

function Header() {
  const title = 'Budget | Merlin'
  const url = BASE_URL + '/cashflow'
  const description = 'How are you spending your money?'

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
