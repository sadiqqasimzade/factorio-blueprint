import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Image to Factorio Tile Blueprint Converter',
    description: 'Transform images into stunning tile blueprints with ease.',
    openGraph: {
        title: 'Image to Factorio Tile Blueprint Converter',
        description: 'Transform images into stunning tile blueprints with ease.',
    },
    twitter: {
        title: 'Image to Factorio Tile Blueprint Converter',
        description: 'Transform images into stunning tile blueprints with ease.',
    },
}

export default function ImageConverterTileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}