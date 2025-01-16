import '@/src/styles/style.scss'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/common/footer/Footer'
import Navbar from '../components/common/header/header'
import PageTransition from '../components/shared/pageTransition'
import ModalProvider from '../contexts/modal/modalProvider'
import SettingProvider from '../contexts/settings/settingProvider'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
const roboto = Roboto({
  weight: ['400', "100", '300', '500', "700"],
  subsets: ['latin']
})
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <ModalProvider>
        <div className={roboto.className + " grid min-h-screen h-full"}>
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
            <Navbar />
            <main className=''>
              <PageTransition>
                <Component {...pageProps} />
              </PageTransition>
            </main>
            <Footer />
          </SettingProvider>
        </div>
      </ModalProvider>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
