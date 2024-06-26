import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Layout from '../../../../components/navigation/Layout'
import { BASE_URL } from '../../../../config/url'
import AccountsDetailsPage from '../../../../domain/holdings/AccountsDetailsPage'
import SecuritiesPage from '../../../../domain/holdings/SecuritiesPage'

function PortfolioDetailsScreen() {
  const router = useRouter()
  const assetType = router.query.type ? router.query.type.toString() : null
  if (assetType == null) {
    return null
  }
  const holdingId = router.query.id ? router.query.id.toString() : null

  switch (assetType.toUpperCase()) {
    case 'SECURITIES':
      return securitiesScreen()
    case 'ACCOUNTS':
      return accountsScreen(holdingId)
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

function accountsScreen(id) {
  const title = 'Your account | Merlin'
  const url = BASE_URL + '/portfolio/accounts/' + id
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
        <AccountsDetailsPage assetId={id} />
      </Layout>
    </>
  )
}

export default PortfolioDetailsScreen
