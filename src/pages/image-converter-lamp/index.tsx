import Container from "@/src/components/shared/container";
import ImageConverterPage from "../imageConverterPage";
import Head from "next/head";


export default function LampConverterPage() {

  return (
    <Container>
      <Head>
        <title>Convert image to lamp Blueprint converter</title>
      </Head>
      <ImageConverterPage convertTo="lamp" skipInput={false} />
    </Container>
  );
}

