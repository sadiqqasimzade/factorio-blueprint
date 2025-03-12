import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function PlatformConverterPage() {

    return (
        <Container>
            <Head>
                <title>Image to Space Platform Blueprint Converter</title>
                <meta property="og:title" content="Image to Space Platform Blueprint Converter" />
                <meta name="twitter:title" content="Image to Space Platform Blueprint Converter" />
                <meta name="description" content="Transform images into stunning space platform blueprints with ease." />
                <meta property="og:description" content="Transform images into stunning space platform blueprints with ease." />
                <meta name="twitter:description" content="Transform images into stunning space platform blueprints with ease." />
            </Head>
            <ImageConverterPage convertToProp="platform" skipInputProp={false} />
        </Container>
    );
}

