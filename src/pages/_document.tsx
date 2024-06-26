import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { GoogleTagManager } from '@next/third-parties/google'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            httpEquiv="content-type"
            content="text/html; charset=UTF-8;charset=utf-8"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f1c433" />
          <meta
            name="twitter:title"
            content="Merlin: Your financial command center"
          />
          <meta
            name="twitter:description"
            content="Merlin, your AI copilot for financial planning, investments, and tax optimization. Simplify your wealth management with personalized insights"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@getmerlinai" />
          <meta name="twitter:image:width" content="1600" />
          <meta name="twitter:image:height" content="900" />
          <meta
            name="twitter:image"
            content="https://storage.googleapis.com/merlin-assets/twitter/merlin_twitter.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image:alt" content="Merlin AI Logo" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="og:url"
            content="https://storage.googleapis.com/merlin-assets/open_graph/merlin_opengraph.png"
          />
          <meta
            property="og:site_name"
            content="Merlin, your AI copilot for financial planning, investments, and tax optimization. Simplify your wealth management with personalized insights."
          />
        </Head>
        <body className="flex h-full flex-col">
          <Main />
          <NextScript />
        </body>
        <GoogleTagManager gtmId={'AW-16568870684'} />
      </Html>
    )
  }
}
