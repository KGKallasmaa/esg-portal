import Head from 'next/head'
import Logo from './Logo'

function ErrorScreen({ title, message, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-800">
        <main className="mx-auto w-full max-w-7xl flex-grow px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 pt-16">
            <Logo className="mx-auto h-12 w-auto" />
          </div>
          <div className="mx-auto flex max-w-xl flex-grow flex-col justify-center py-2 sm:py-2">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
                {message}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </main>
        <div className="w-full px-4 pb-4 sm:px-6 md:pb-0">
          <button
            type="button"
            className="hover:bg-primary-darker group relative w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </>
  )
}

export default ErrorScreen
