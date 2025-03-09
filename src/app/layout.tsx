import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { OpenPanelComponent } from '@openpanel/nextjs'
import { Analytics } from '@vercel/analytics/react'
import Providers from './provides'
import SiteHeader from '@/components/site-header'
import './globals.css'

const fontSans = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansSC-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/NotoSansSC-SemiBold.ttf',
      weight: '600',
      style: 'semibold'
    },
    {
      path: '../../public/fonts/NotoSansSC-Bold.ttf',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'TripSeek',
  description: '由 ChatGPT 和 DeepSeek 驱动的 AI 旅行规划师。',
  keywords: ['AI旅行规划师', 'TripSeek'],
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏞️</text></svg>"
}

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode
}) {
  const opClientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={cn(fontSans.variable, 'h-screen w-screen')}
      suppressHydrationWarning
    >
      <body className='bg-background h-full overflow-x-hidden bg-[radial-gradient(#80808080_1px,transparent_1px)] antialiased [background-size:24px_24px]'>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SiteHeader />
            <main className='relative h-[calc(100%-64px)] w-full'>
              {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
        <OpenPanelComponent
          clientId={opClientId || ''}
          trackScreenViews={true}
          trackOutgoingLinks={true}
        />
        <Analytics />
      </body>
    </html>
  )
}
