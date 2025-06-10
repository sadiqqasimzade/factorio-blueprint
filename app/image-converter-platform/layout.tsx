import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Image to Factorio Platform Blueprint Converter',
    description: 'Transform images into stunning platform blueprints with ease.',
    openGraph: {
        title: 'Image to Factorio Platform Blueprint Converter',
        description: 'Transform images into stunning platform blueprints with ease.',
    },
    twitter: {
        title: 'Image to Factorio Platform Blueprint Converter',
        description: 'Transform images into stunning platform blueprints with ease.',
    },
}

export default function ImageConverterPlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}