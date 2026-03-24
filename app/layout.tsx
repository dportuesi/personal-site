import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionContainer from '@/components/SectionContainer'
import LeftDarkGradient from '@/components/background/left-dark-gradient.svg'
import RightDarkGradient from '@/components/background/right-dark-gradient.svg'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: siteMetadata.locale,
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
  icons: {
    icon: [
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/static/favicons/apple-touch-icon.png', sizes: '76x76' }],
    other: [{ rel: 'mask-icon', url: '/static/favicons/safari-pinned-tab.svg', color: '#5bbad5' }],
  },
  manifest: '/static/favicons/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-white text-black antialiased dark:bg-gray-900 dark:text-white animate-in fade-in duration-700">
        <ThemeProviders>
          <Header />
          <SectionContainer>
            <div className="flex min-h-screen flex-col justify-between">
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
            <div className="fixed -bottom-11 -left-28 -z-10 h-full w-full opacity-60 sm:-bottom-0 sm:-left-64">
              <LeftDarkGradient />
            </div>
            <div className="fixed -top-96 right-64 -z-10 h-full w-full opacity-60 sm:-right-96">
              <RightDarkGradient />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
