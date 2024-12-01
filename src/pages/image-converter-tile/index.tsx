import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function TileConverterPage() {

    return (
        <Container>
            <Head>
                <title>Image to Tile Blueprint Converter</title>
                <meta property="og:title" content="Image to Tile Blueprint Converter" />
                <meta name="twitter:title" content="Image to Tile Blueprint Converter" />
                <meta name="description" content="Transform images into stunning tile blueprints with ease." />
                <meta property="og:description" content="Transform images into stunning tile blueprints with ease." />
                <meta name="twitter:description" content="Transform images into stunning tile blueprints with ease." />
            </Head>
            <ImageConverterPage convertToProp="tile" skipInputProp={false} />
        </Container>
    );
}

