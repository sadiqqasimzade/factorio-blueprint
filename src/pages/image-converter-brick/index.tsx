import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function BrickConverterPage() {

    return (
        <Container>
            <Head>
                <title>Convert image to brick Blueprint converter</title>
            </Head>
            <ImageConverterPage convertTo="brick" skipInput={false} />
        </Container>
    );
}

