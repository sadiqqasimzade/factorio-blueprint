import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Video to Factorio Lamp Blueprint Converter',
    description: 'Convert video frames into dynamic Factorio lamp blueprints with customizable timing and effects.',
    keywords: ['video to factorio lamp blueprint converter', 'factorio lamp blueprint converter', 'factorio lamp blueprint', 'factorio lamp', 'factorio', 'blueprint', 'converter', 'video', 'lamp', 'blueprint', 'converter'],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/video-converter',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Video to Factorio Lamp Blueprint Converter',
        description: 'Convert video frames into dynamic Factorio lamp blueprints with customizable timing and effects.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/video-converter',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Video to Factorio Lamp Blueprint Converter',
        description: 'Convert video frames into dynamic Factorio lamp blueprints with customizable timing and effects.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
}

export default function VideoConverterLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}