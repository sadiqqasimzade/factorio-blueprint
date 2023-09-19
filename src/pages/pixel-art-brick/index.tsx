import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function BrickPixelConverterPage() {

    return (
        <Container>
            <Head>
                <title>Pixel art to brick Blueprint converter</title>
            </Head>
            <ImageConverterPage convertTo="brick" skipInput={true} />
        </Container>
    );
}

