import { BASE_URL } from '../../../config/url'
import SecuritiesPage from '../../../domain/holdings/SecuritiesPage'
import AccountsPage from '../../../domain/holdings/AccountsPage'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../../components//navigation/Layout'

function PortfolioOverviewScreen() {
  const router = useRouter()
  const assetType = router.query.type ? router.query.type.toString() : null
  if (assetType == null) {
    return null
  }

  switch (assetType.toUpperCase()) {
    case 'SECURITIES':
      return securitiesScreen()
    case 'ACCOUNTS':
      return accountsScreen()
  }
  return null
}

function securitiesScreen() {
  const title = 'Your securities | Merlin'
  const url = BASE_URL + '/portfolio/securities'
  const description = 'Your securities'
  return (
    <>
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
      <Layout>
        <SecuritiesPage />
      </Layout>
    </>
  )
}

function accountsScreen() {
  const title = 'Your accounts | Merlin'
  const url = BASE_URL + '/portfolio/accounts'
  const description = 'Your accounts'
  return (
    <>
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
      <Layout>
        <AccountsPage />
      </Layout>
    </>
  )
}

export default PortfolioOverviewScreen
