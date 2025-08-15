import '@/app/globals.css'
import '@/app/style.scss'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import NextScript from 'next/script'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '@/components/common/footer/Footer'
import Navbar from '@/components/common/header/header'
import ModalProvider from '@/contexts/modal/modalProvider'
import SettingProvider from '@/contexts/settings/settingProvider'
import { Metadata } from 'next'

const roboto = Roboto({
  weight: ['400', "100", '300', '500', "700"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Factorio Blueprint Generator',
  description: 'Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions.',
  keywords: 'Factorio,Blueprint,Converter,Blueprint-Converter,Image to Blueprint,Blueprint Generator',
  authors: [{ name: 'Sadiq Qasimzade' }],
  openGraph: {
    type: 'website',
    siteName: 'Factorio Tools',
    images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
    url: 'https://factorio-blueprint.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://factorio-blueprint.vercel.app',
    creator: 'sadiq_qasimzade',
    images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
  },
  manifest: 'manifest.json',
  robots: 'index, follow',
  applicationName: 'Factorio Tools',
  icons: [
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: 'imgs/favicons/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: 'imgs/favicons/favicon-32x32.png' },
    { rel: 'icon', url: 'imgs/favicons/favicon.ico' },
  ],
  alternates: {
    canonical: 'https://factorio-blueprint.vercel.app',
  },
  verification: {
    google: 'pcVqOWBcshqtczsXmc7uPJNVNQogS1wN4WJmaDeNPpM',
    yandex: 'e8eb17829dd8cb60',
  },
  metadataBase: new URL('https://factorio-blueprint.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-white bg-slate-900`}>
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
              <div className="inset-0 opacity-20 -z-10 fixed"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23374151' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}>

              </div>
              <Navbar />
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
