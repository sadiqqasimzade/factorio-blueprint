import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name="keywords" content="Factorio,Blueprint,Converter,Blueprint-Converter,Image to Blueprint" />
        <meta name="author" content="Sadiq Qasimzade" />
        <meta name="theme-color" content="#0C343D" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Factorio Tools" />
        <meta property="og:image" content="https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif" />
        <meta property="og:url" content="https://factorio-blueprint.vercel.app" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://factorio-blueprint.vercel.app" />
        <meta name="twitter:creator" content="sadiq_qasimzade" />
        <meta name="twitter:image" content="https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif" />

        <link rel="manifest" href="manifest.json" />
        <meta name="google-site-verification" content="pcVqOWBcshqtczsXmc7uPJNVNQogS1wN4WJmaDeNPpM" />
        <meta name="yandex-verification" content="e8eb17829dd8cb60" />
        <meta name="robots" content="index, follow"/>

        <meta name="application-name" content="Factorio Tools" />

        <link rel="apple-touch-icon" sizes="180x180" href="imgs/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="imgs/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="imgs/favicons/favicon-32x32.png" />
        <link rel="icon" href="imgs/favicons/favicon.ico" />

      </Head>
      <body className='text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
