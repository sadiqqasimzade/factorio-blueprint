import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function LampPixelConverterPage() {

    return (
        <Container>
            <Head>
                <title>Pixel Art to Lamp Blueprint Converter</title>
                <meta property="og:title" content="Pixel Art to Lamp Blueprint Converter" />
                <meta name="twitter:title" content="Pixel Art to Lamp Blueprint Converter" />
                <meta name="description" content="Craft personalized art with this editor, then effortlessly transform it into a lamp blueprint" />
                <meta property="og:description" content="Craft personalized art with this editor, then effortlessly transform it into a lamp blueprint" />
                <meta name="twitter:description" content="Craft personalized art with this editor, then effortlessly transform it into a lamp blueprint" />
            </Head>
            <ImageConverterPage convertTo="lamp" skipInput={true} />
        </Container>
    );
}

