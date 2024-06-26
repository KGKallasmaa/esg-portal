import Head from 'next/head'
import Layout from '../../../../components/navigation/Layout'
import { BASE_URL } from '../../../../config/url'
import { useRouter } from 'next/router'
import SingleCategoryCashflowPage from '../../../../domain/cashflow/SingleCategoryCashflowPage'

export default function SingleCategoryScreen() {
  const router = useRouter()
  const category = router.query.category
    ? router.query.category.toString()
    : null
  if (category == null) {
    return null
  }
  return (
    <>
      <Header category={category} />
      <Layout>
        <SingleCategoryCashflowPage category={category} />
      </Layout>
    </>
  )
}

function Header({ category }: { category: string }) {
  const title = category + '| Merlin'
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
