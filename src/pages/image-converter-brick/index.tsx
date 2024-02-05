import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function BrickConverterPage() {

    return (
        <Container>
            <Head>
                <title>Image to Factorio Floor Blueprint Converter</title>
                <meta property="og:title" content="Image to Factorio Floor Blueprint Converter" />
                <meta name="twitter:title" content="Image to Factorio Floor Blueprint Converter" />
                <meta name="description" content="Transform images into stunning brick/concrete floors blueprints with ease." />
                <meta property="og:description" content="Transform images into stunning brick/concrete floors blueprints with ease." />
                <meta name="twitter:description" content="Transform images into stunning brick/concrete floors blueprints with ease." />
            </Head>
            <ImageConverterPage convertTo="brick" skipInput={false} />
        </Container>
    );
}

