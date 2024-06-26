import EmptyChatPage from './EmptyChatPage'
import Head from 'next/head'
import ChatPage from './ChatPage'
import useAdvisorStore from '../../state_management/stores/advisor.store'

function AdvisorPage() {
  const { chatId } = useAdvisorStore()
  const defaultTitle = buildTitle()
  const defaultURL = buildURL()
  return (
    <>
      <ChatsHeader title={defaultTitle} url={defaultURL} />
      <ChatPage />
    </>
  )
}

function ChatsHeader({ title, url }: { title: string; url: string }) {
  // todo: if there's a title, fetch it from the server
  const description =
    'Merlin is a financial advisor that helps you with your finances'
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
function buildTitle() {
  return 'Chat | Merlin'
}
function buildURL(id?: string) {
  if (!id) {
    return 'https://getmerlin.ai'
  }
  return `https://getmerlin.ai/advisor/c/${id}`
}

export default AdvisorPage
