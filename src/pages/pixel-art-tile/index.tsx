import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function TilePixelConverterPage() {

    return (
        <Container>
            <Head>
                <title>Pixel Art to Tile Blueprint Converter</title>
                <meta property="og:title" content="Pixel Art to Tile Blueprint Converter" />
                <meta name="twitter:title" content="Pixel Art to Tile Blueprint Converter" />
                <meta name="description" content="Craft personalized art with this editor, then effortlessly transform it into a tile blueprint" />
                <meta property="og:description" content="Craft personalized art with this editor, then effortlessly transform it into a tile blueprint" />
                <meta name="twitter:description" content="Craft personalized art with this editor, then effortlessly transform it into a tile blueprint" />
            </Head>
            <ImageConverterPage convertToProp="tile" skipInputProp={true} />
        </Container>
    );
}

