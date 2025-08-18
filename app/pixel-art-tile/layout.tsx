import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Pixel Art to Factorio Tile Blueprint Converter',
    description: 'Convert pixel art images into detailed Factorio tile blueprints with precise color mapping and grid control.',
    keywords: ['pixel art to factorio tile blueprint converter', 'factorio tile blueprint converter', 'factorio tile blueprint', 'factorio tile', 'factorio', 'blueprint', 'converter', 'image', 'tile', 'blueprint', 'converter'],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/pixel-art-tile',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Pixel Art to Factorio Tile Blueprint Converter',
        description: 'Convert pixel art images into detailed Factorio tile blueprints with precise color mapping and grid control.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/pixel-art-tile',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Pixel Art to Factorio Tile Blueprint Converter',
        description: 'Convert pixel art images into detailed Factorio tile blueprints with precise color mapping and grid control.',
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