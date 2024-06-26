import Head from 'next/head'
import Layout from '../../components/navigation/Layout'
import { BASE_URL } from '../../config/url'
import CashflowTransactionsPage from '../../domain/cashflow/CashflowTransactionsPage'

export default function CashflowTransactionsScreen() {
  return (
    <>
      <Header />
      <Layout>
        <CashflowTransactionsPage />
      </Layout>
    </>
  )
}

function Header() {
  const title = 'Your transactions | Merlin'
  const url = BASE_URL + '/cashflow/transactions'
  const description = 'View and manage your transactions.'

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
