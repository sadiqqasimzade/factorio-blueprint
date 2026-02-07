import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Factorio Blueprint Generator - Image to Factorio Tile Blueprint Converter',
    description: 'Convert any image into detailed Factorio tile blueprints with automatic color optimization and grid scaling.',
    keywords: [
      'image to factorio tile blueprint converter',
      'factorio tile blueprint converter',
      'factorio tile blueprint',
      'factorio tile',
      'image to blueprint',
      'png to blueprint',
      'jpg to blueprint',
      'image converter factorio',
      'tile blueprint generator',
      'image to tile',
      'photo to blueprint',
      'picture to blueprint',
      'image processing',
      'color mapping',
      'grid scaling',
      'factorio',
      'blueprint',
      'converter',
      'image',
      'tile',
      'blueprint creator',
      'image tool',
      'game utility',
      'factorio art',
      'blueprint maker',
      'image optimizer',
      'tile design',
      'factorio base',
      'blueprint designer',
      'factorio community',
    ],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/image-converter-tile',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Image to Factorio Tile Blueprint Converter',
        description: 'Convert any image into detailed Factorio tile blueprints with automatic color optimization and grid scaling.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/image-converter-tile',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Image to Factorio Tile Blueprint Converter',
        description: 'Convert any image into detailed Factorio tile blueprints with automatic color optimization and grid scaling.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default async function ImageConverterTileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}