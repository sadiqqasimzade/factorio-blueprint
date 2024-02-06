import '@/src/styles/style.scss'
import type { AppProps } from 'next/app'
import ModalProvider from '../contexts/modalProvider'
import Footer from '../components/common/footer/Footer'
import Navbar from '../components/common/header/header'
import { Roboto } from 'next/font/google'
import PageTransition from '../components/shared/pageTransition'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({
  weight: ['400', "100", '300', '500', "700"],
  subsets: ['latin']
})
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <ModalProvider>
        <div className={roboto.className}>
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
            style={{width: '100%'}}
          />
          <Navbar />
          <main className='min-h-screen'>
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </main>
          <Footer />
        </div>
      </ModalProvider>
    </>
  )
}
