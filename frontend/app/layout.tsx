import { PropsWithChildren } from 'react'
import Providers from './components/Providers'
import { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin', 'cyrillic'], weight: '400' })

export const metadata: Metadata = {
  title: 'D2BN',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
    <body className={ibmPlexSans.className}>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  )
}
