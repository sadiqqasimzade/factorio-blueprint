import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Image to Factorio Platform Blueprint Converter',
    description: 'Convert images into Factorio platform blueprints with customizable elevation mapping and terrain integration.',
    keywords: ['image to factorio platform blueprint converter', 'factorio platform blueprint converter', 'factorio platform blueprint', 'factorio platform', 'factorio', 'blueprint', 'converter', 'image', 'platform', 'blueprint', 'converter'],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/image-converter-platform',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Image to Factorio Platform Blueprint Converter',
        description: 'Convert images into Factorio platform blueprints with customizable elevation mapping and terrain integration.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/image-converter-platform',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Image to Factorio Platform Blueprint Converter',
        description: 'Convert images into Factorio platform blueprints with customizable elevation mapping and terrain integration.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default async function ImageConverterPlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}