import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Image to Factorio Lamp Blueprint Converter',
    description: 'Convert images into dynamic Factorio lamp blueprints with customizable brightness and color mapping for stunning base art.',
    keywords: [
      'image to factorio lamp blueprint converter',
      'factorio lamp blueprint converter',
      'factorio lamp blueprint',
      'factorio lamp',
      'image to lamp blueprint',
      'png to lamp',
      'jpg to lamp',
      'image converter factorio',
      'lamp blueprint generator',
      'image to lamp',
      'photo to lamp',
      'picture to lamp blueprint',
      'brightness mapping',
      'color mapping',
      'lamp art',
      'base art',
      'factorio',
      'blueprint',
      'converter',
      'image',
      'lamp',
      'blueprint creator',
      'image tool',
      'game utility',
      'factorio art',
      'lamp design',
      'blueprint maker',
      'light art',
      'factorio base',
      'blueprint designer',
      'factorio community',
    ],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/image-converter-lamp',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Image to Factorio Lamp Blueprint Converter',
        description: 'Convert images into dynamic Factorio lamp blueprints with customizable brightness and color mapping for stunning base art.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/image-converter-lamp',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Image to Factorio Lamp Blueprint Converter',
        description: 'Convert images into dynamic Factorio lamp blueprints with customizable brightness and color mapping for stunning base art.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default async function ImageConverterLampLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}