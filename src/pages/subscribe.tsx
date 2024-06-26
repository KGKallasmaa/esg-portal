import Head from 'next/head'
import SubscriptionPage from '../domain/static/SubscriptionPage'
import { useRouter } from 'next/router'
import Footer from '../components/footer'

const seoMap = {
  title: 'Subscribe | Merlin',
  description:
    'Thank you for subscribe to Merlin! Enjoy the best of Merlin with a subscription.',
  url: 'https://getmerlin.ai/subscribe',
}

export default function SubscribeScreen() {
  const router = useRouter()
  const { success } = router.query

  const { title, description, url } = seoMap
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Head>
      <SubscriptionPage mode={success === 'true' ? 'success' : 'cancel'} />
      <Footer />
    </>
  )
}
