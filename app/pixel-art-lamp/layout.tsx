import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Pixel Art to Factorio Lamp Blueprint Converter',
    description: 'Convert pixel art images into detailed Factorio lamp blueprints with precise color mapping and grid control.',
    keywords: [
      'pixel art to factorio lamp blueprint converter',
      'factorio lamp blueprint converter',
      'factorio lamp blueprint',
      'factorio lamp',
      'pixel art to lamp',
      'pixel art converter',
      'pixel art generator',
      'pixel to lamp',
      '8bit art',
      'retro art',
      'pixel design',
      'lamp art',
      'precise color mapping',
      'grid control',
      'pixel perfect',
      'light art',
      'base art',
      'factorio',
      'blueprint',
      'converter',
      'pixel art',
      'lamp',
      'blueprint creator',
      'pixel tool',
      'game utility',
      'factorio art',
      'pixel maker',
      'retro design',
      'blueprint designer',
      'factorio community',
      'pixel lamp',
    ],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/pixel-art-lamp',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Pixel Art to Factorio Lamp Blueprint Converter',
        description: 'Convert pixel art images into detailed Factorio lamp blueprints with precise color mapping and grid control.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/pixel-art-lamp',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Pixel Art to Factorio Lamp Blueprint Converter',
        description: 'Convert pixel art images into detailed Factorio lamp blueprints with precise color mapping and grid control.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default async function PixelArtLampLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}