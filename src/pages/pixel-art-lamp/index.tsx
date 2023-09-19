import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function LampPixelConverterPage() {

    return (
        <Container>
            <Head>
                <title>Pixel art to lamp Blueprint converter</title>
            </Head>
            <ImageConverterPage convertTo="lamp" skipInput={true} />
        </Container>
    );
}

