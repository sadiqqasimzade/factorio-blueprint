import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Pixel Art to Factorio Tile Blueprint Converter',
    description: 'Convert pixel art images into detailed Factorio tile blueprints with precise color mapping and grid control.',
    keywords: [
      'pixel art to factorio tile blueprint converter',
      'factorio tile blueprint converter',
      'factorio tile blueprint',
      'factorio tile',
      'pixel art to blueprint',
      'pixel art converter',
      'pixel art generator',
      'pixel to tile',
      '8bit art',
      'retro art',
      'pixel design',
      'tile art',
      'precise color mapping',
      'grid control',
      'pixel perfect',
      'factorio',
      'blueprint',
      'converter',
      'pixel art',
      'tile',
      'blueprint creator',
      'pixel tool',
      'game utility',
      'factorio art',
      'pixel maker',
      'retro design',
      'blueprint designer',
      'factorio community',
      'pixel base',
    ],
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

export default async function PixelArtTileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}