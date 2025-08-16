import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Image to Factorio Platform Blueprint Converter',
    description: 'Transform images into stunning platform blueprints with ease.',
    keywords: ['image to factorio platform blueprint converter', 'factorio platform blueprint converter', 'factorio platform blueprint', 'factorio platform', 'factorio', 'blueprint', 'converter', 'image', 'platform', 'blueprint', 'converter'],
    openGraph: {
        title: 'Image to Factorio Platform Blueprint Converter',
        description: 'Transform images into stunning platform blueprints with ease.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/image-converter-platform',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Image to Factorio Platform Blueprint Converter',
        description: 'Transform images into stunning platform blueprints with ease.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default function ImageConverterPlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}