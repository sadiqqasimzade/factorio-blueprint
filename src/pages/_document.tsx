import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name="keywords" content="Factorio,Blueprint,Converter,Blueprint-Converter,Image to Blueprint" />
        <meta name="description" content="Factorio tools for generaing Blueprints" />
        <meta name="author" content="Sadiq Qasimzade" />
        <meta name="theme-color" content="#0C343D" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Factorio Toolso" />
        <meta property="og:title" content="Factorio Tools" />
        <meta property="og:description" content="Factorio tools for generaing Blueprints" />
        <meta property="og:image" content="https://factorio-blueprint.netlify.app/imgs/favicons/android-chrome-512x512.png" />
        <meta property="og:url" content="https://factorio-blueprint.netlify.app" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://factorio-blueprint.netlify.app" />
        <meta name="twitter:creator" content="sadiq_qasimzade" />
        <meta name="twitter:description" content="Factorio tools for generaing Blueprints" />
        <meta name="twitter:image" content="https://factorio-blueprint.netlify.app/imgs/favicons/android-chrome-512x512.png" />

        <link rel="manifest" href="manifest.json" />
        <meta name="google-site-verification" content="MbQsveDx56v1MWMVfO2uoGi-XMV3eSilmUtrSYtS45M" />
        <meta name="yandex-verification" content="4b6cf7725a792739" />

        <meta name="application-name" content="Sadiq's Portfolio" />

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
