import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function LampConverterPage() {

  return (
    <Container>
      <Head>
        <title>Image to Factorio Lamp Blueprint Converter</title>
        <meta property="og:title" content="Image to Factorio Lamp Blueprint Converter" />
        <meta name="twitter:title" content="Image to Factorio Lamp Blueprint Converter" />
        <meta name="description" content="Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience." />
        <meta property="og:description" content="Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience." />
        <meta name="twitter:description" content="Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience." />
      </Head>
      <ImageConverterPage convertToProp="lamp" skipInputProp={false} />
    </Container>
  );
}

