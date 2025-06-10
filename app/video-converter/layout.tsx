import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Video to Factorio Lamp Blueprint Converter',
    description: 'Transform videos into stunning lamp blueprints with ease.',
    openGraph: {
        title: 'Video to Factorio Lamp Blueprint Converter',
        description: 'Transform videos into stunning lamp blueprints with ease.',
    },
    twitter: {
        title: 'Video to Factorio Lamp Blueprint Converter',
        description: 'Transform videos into stunning lamp blueprints with ease.',
    },
}

export default function VideoConverterLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}