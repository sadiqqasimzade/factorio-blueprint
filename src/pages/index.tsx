import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Card from '../components/card/card'
import ModalContext from '../contexts/modal/modalContext'


export default function Home() {
  const { hideModal, modalIsActive } = useContext(ModalContext)
  useEffect(() => {
    if (modalIsActive()) {
      hideModal()
    }
  }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 '>
      <Head>
        <title>Factorio Blueprint Generator</title>
        <meta property="og:title" content="Factorio Blueprint Generator" />
        <meta name="twitter:title" content="Factorio Blueprint Generator" />
        <meta name="description" content="Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions." />
        <meta property="og:description" content="Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions." />
        <meta name="twitter:description" content="Explore a suite of tools to convert images and videos, create custom art, and optimize Factorio blueprints. Elevate your gaming with easy-to-use solutions." />
      </Head>
      <Card
        title="Blueprint Decoder and Encoder"
        link="decode-encode"
        imgSrc="decoder.png"
      />
      <Card
        title="Image to Lamp Blueprint Converter"
        link="image-converter-lamp"
        imgSrc="img_to_lamp.png"
      />
      <Card
        title="Image to Floor Blueprint Converter"
        link="image-converter-tile"
        imgSrc="img_to_tile.png"
      />
      <Card
        title="Pixel Art to Floor Blueprint Converter"
        link="pixel-art-tile"
        imgSrc="pixel_art_tile.png"
      />
      <Card
        title="Video to Blueprint Converter"
        link="video-converter"
        imgSrc="video_to_lamp.gif"
      />
    </div>
  )
}
