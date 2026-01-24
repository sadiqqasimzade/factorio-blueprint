import '@/app/globals.css'
import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import ModalProvider from '@/contexts/modal/modalProvider'
import SettingProvider from '@/contexts/settings/settingProvider'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from 'next'
import { JetBrains_Mono, Roboto } from 'next/font/google'
import NextScript from 'next/script'
import { ToastContainer } from 'react-toastify'


const roboto = Roboto({
  weight: ['400', "100", '300', '500', "700"],
  subsets: ['latin'],
  display: 'swap'
})

const font = JetBrains_Mono({
  weight: ['400', "100", '300', '500', "700"],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Factorio Blueprint Generator - Create Blueprints Easily',
    template: '%s | Factorio Tools',
  },
  description: 'Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions.',
  keywords: [
    'Factorio',
    'Blueprint Generator',
    'Blueprint Converter',
    'Image to Blueprint',
    'Video to Blueprint',
    'Pixel Art',
    'Factorio Tools',
    'Blueprint Decoder',
    'Blueprint Encoder',
    'Game Tools',
    'Factorio Blueprint Creator',
    'Blueprint Maker',
    'Factorio Blueprint Tool',
    'Online Blueprint Generator',
    'Free Blueprint Converter',
    'Factorio Base Design',
    'Blueprint Designer',
    'Factorio Automation',
    'Game Blueprint',
    'Factorio Mod',
    'Blueprint Sharing',
    'Factorio Community',
    'Blueprint String',
    'Factorio Planner',
    'Game Utility',
    'Factorio Helper',
    'Blueprint Editor',
    'Factorio Resources',
    'Blueprint Library',
    'Factorio Tips',
  ],
  authors: [{ name: 'Sadiq Qasimzade' }],
  creator: 'Sadiq Qasimzade',
  publisher: 'Factorio Tools',
  openGraph: {
    title: 'Factorio Blueprint Generator - Create Blueprints Easily',
    description: 'Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions.',
    type: 'website',
    siteName: 'Factorio Tools',
    locale: 'en_US',
    images: [
      {
        url: 'https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif',
        width: 1200,
        height: 630,
        alt: 'Factorio Blueprint Generator',
      },
    ],
    url: 'https://factorio-blueprint.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Factorio Blueprint Generator - Create Blueprints Easily',
    description: 'Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions.',
    site: '@factorio_tools',
    creator: '@sadiq_qasimzade',
    images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
  },
  manifest: '/manifest.json',
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
  applicationName: 'Factorio Tools',
  category: 'Game Tools',
  classification: 'Utility',
  icons: {
    icon: [
      { url: '/imgs/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/imgs/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/imgs/favicons/favicon.ico' },
    ],
    apple: [
      { url: '/imgs/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://factorio-blueprint.vercel.app',
  },
  verification: {
    google: 'pcVqOWBcshqtczsXmc7uPJNVNQogS1wN4WJmaDeNPpM',
    yandex: 'e8eb17829dd8cb60',
  },
  metadataBase: new URL('https://factorio-blueprint.vercel.app'),
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Factorio Blueprint Generator',
              alternateName: 'Factorio Tools',
              description: 'A free web-based tool to convert images and videos into Factorio blueprints, create pixel art, and optimize designs for the game Factorio.',
              url: 'https://factorio-blueprint.vercel.app',
              operatingSystem: 'Web',
              applicationCategory: 'Game',
              applicationSubCategory: 'Utility',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/OnlineOnly',
              },
              isAccessibleForFree: true,
              creator: {
                '@type': 'Person',
                name: 'Sadiq Qasimzade',
              },
              datePublished: '2025-06-10',
              dateModified: new Date().toISOString().split('T')[0],
              inLanguage: 'en-US',
              featureList: [
                'Image to Blueprint Conversion',
                'Video to Blueprint Conversion',
                'Pixel Art Creation for Factorio',
                'Blueprint Decoding and Encoding',
              ],
              keywords: 'Factorio, Blueprint Generator, Blueprint Converter, Image to Blueprint, Video to Blueprint, Pixel Art, Factorio Tools, Blueprint Decoder, Blueprint Encoder, Game Tools, Factorio Blueprint Creator, Blueprint Maker, Factorio Blueprint Tool, Online Blueprint Generator, Free Blueprint Converter, Factorio Base Design, Blueprint Designer, Factorio Automation, Game Blueprint, Factorio Mod, Blueprint Sharing, Factorio Community, Blueprint String, Factorio Planner, Game Utility, Factorio Helper, Blueprint Editor, Factorio Resources, Blueprint Library, Factorio Tips',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://factorio-blueprint.vercel.app',
              },
            }),
          }}
        />
      </head>
      <body className={`${roboto.className} ${font.className} text-white bg-bg`}>
        <ModalProvider>
          <div className="grid min-h-screen h-full">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              style={{ width: '100%' }}
            />
            <SettingProvider>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </SettingProvider>
          </div>
        </ModalProvider>
        <NextScript />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
