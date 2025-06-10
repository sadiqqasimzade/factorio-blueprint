import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Image to Factorio Lamp Blueprint Converter',
    description: 'Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience.',
    openGraph: {
        title: 'Image to Factorio Lamp Blueprint Converter',
        description: 'Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience.',
    },
    twitter: {
        title: 'Image to Factorio Lamp Blueprint Converter',
        description: 'Transform images into stunning lamp-based art for your base in the game. Generate unique designs with ease and enhance your gaming experience.',
    },
}

export default function ImageConverterLampLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}