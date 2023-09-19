import Head from 'next/head'
import Card from '../components/card/card'


export default function Home() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 '>
      <Head>
        <title>Factorio Blueprint Generator</title>
      </Head>
      <Card
        title="Decoder/Encoder"
        desc="Decodes or Encodes factorio blueprint strings"
        link="decode-encode"
        imgSrc="decoder.png"
      />
      <Card
        title="Image converter - Lamp"
        desc="Converts image to factorio blueprint"
        link="image-converter-lamp"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Image converter - Brick"
        desc="Converts image to factorio blueprint"
        link="image-converter-brick"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Pixel Art - Lamp"
        desc="Converts Pixel Art to factorio blueprint"
        link="pixel-art-lamp"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Pixel Art - Brick"
        desc="Converts Pixel Art to factorio blueprint"
        link="pixel-art-brick"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Video converter - Lamp"
        desc="Converts video to factorio blueprint"
        link="video-converter"
        imgSrc="img-to-blueprint.png"
      />
    </div>
  )
}
