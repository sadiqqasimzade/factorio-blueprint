import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function BrickPixelConverterPage() {

    return (
        <Container>
            <Head>
                <title>Pixel Art to Floor Blueprint Converter</title>
                <meta property="og:title" content="Pixel Art to Floor Blueprint Converter" />
                <meta name="twitter:title" content="Pixel Art to Floor Blueprint Converter" />
                <meta name="description" content="Craft personalized art with this editor, then effortlessly transform it into a brick/concrete floor blueprint" />
                <meta property="og:description" content="Craft personalized art with this editor, then effortlessly transform it into a brick/concrete floor blueprint" />
                <meta name="twitter:description" content="Craft personalized art with this editor, then effortlessly transform it into a brick/concrete floor blueprint" />
            </Head>
            <ImageConverterPage convertTo="brick" skipInput={true} />
        </Container>
    );
}

