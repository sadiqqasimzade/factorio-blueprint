import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Pixel Art to Factorio Tile Blueprint Converter',
    description: 'Transform pixel art into stunning tile blueprints with ease.',
    keywords: ['pixel art to factorio tile blueprint converter', 'factorio tile blueprint converter', 'factorio tile blueprint', 'factorio tile', 'factorio', 'blueprint', 'converter', 'image', 'tile', 'blueprint', 'converter'],
    openGraph: {
        title: 'Pixel Art to Factorio Tile Blueprint Converter',
        description: 'Transform pixel art into stunning tile blueprints with ease.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/pixel-art-tile',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Pixel Art to Factorio Tile Blueprint Converter',
        description: 'Transform pixel art into stunning tile blueprints with ease.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default function PixelArtTileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}