import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Pixel Art to Factorio Tile Blueprint Converter',
    description: 'Transform pixel art into stunning tile blueprints with ease.',
    openGraph: {
        title: 'Pixel Art to Factorio Tile Blueprint Converter',
        description: 'Transform pixel art into stunning tile blueprints with ease.',
    },
    twitter: {
        title: 'Pixel Art to Factorio Tile Blueprint Converter',
        description: 'Transform pixel art into stunning tile blueprints with ease.',
    },
}

export default function PixelArtTileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}