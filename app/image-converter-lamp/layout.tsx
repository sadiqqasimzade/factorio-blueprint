import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Image to Factorio Lamp Blueprint Converter',
    description: 'Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience.',
    keywords: ['image to factorio lamp blueprint converter', 'factorio lamp blueprint converter', 'factorio lamp blueprint', 'factorio lamp', 'factorio', 'blueprint', 'converter', 'image', 'lamp', 'blueprint', 'converter'],
    openGraph: {
        title: 'Image to Factorio Lamp Blueprint Converter',
        description: 'Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/image-converter-lamp',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Image to Factorio Lamp Blueprint Converter',
        description: 'Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default function ImageConverterLampLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}