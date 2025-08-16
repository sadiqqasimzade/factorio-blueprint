import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Image to Factorio Tile Blueprint Converter',
    description: 'Transform images into stunning tile blueprints with ease.',
    keywords: ['image to factorio tile blueprint converter', 'factorio tile blueprint converter', 'factorio tile blueprint', 'factorio tile', 'factorio', 'blueprint', 'converter', 'image', 'tile', 'blueprint', 'converter'],
    openGraph: {
        title: 'Image to Factorio Tile Blueprint Converter',
        description: 'Transform images into stunning tile blueprints with ease.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/image-converter-tile',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Image to Factorio Tile Blueprint Converter',
        description: 'Transform images into stunning tile blueprints with ease.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default function ImageConverterTileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}