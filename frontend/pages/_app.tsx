import 'antd/dist/reset.css'
import '@/public/antd.min.css'
import '@/styles/fonts/stylesheet.scss'
import '@/styles/scroll.scss'
import Layout from '@/src/components/Layout'
import type { AppProps } from 'next/app'
import withTheme from '@/src/theme'
import dayjs from 'dayjs'
import Head from 'next/head'

dayjs.locale('en')

export default function App({ Component, pageProps }: AppProps) {
  return withTheme(
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>D2BN</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
