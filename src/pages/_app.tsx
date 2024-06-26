import '../styles/tailwind.css'
import { ThemeProvider } from 'next-themes'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
const queryClient = new QueryClient()

// @ts-ignore:next-line
export default function App({ Component, pageProps }) {
  return (
    <div className={poppins.className}>
      <ThemeProvider defaultTheme="dark" enableSystem={false}>
        <Toaster />
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <Analytics />
            </Hydrate>
            {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
          </QueryClientProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  )
}
