import Container from "@/components/shared/container";
import { Metadata } from "next";


export const metadata: Metadata = {

    title: 'Factorio Blueprint Generator - Video to Factorio Lamp Blueprint Converter',
    description: 'Convert video frames into dynamic Factorio lamp blueprints with customizable timing and effects.',
    keywords: [
      'video to factorio lamp blueprint converter',
      'factorio lamp blueprint converter',
      'factorio lamp blueprint',
      'factorio lamp',
      'video to blueprint',
      'gif to blueprint',
      'mp4 to blueprint',
      'video converter factorio',
      'animated blueprint',
      'factorio animation',
      'lamp blueprint generator',
      'video frame extraction',
      'factorio video tool',
      'blueprint animation',
      'dynamic blueprint',
      'factorio',
      'blueprint',
      'converter',
      'video',
      'lamp',
      'gif converter',
      'video processing',
      'frame by frame',
      'factorio art',
      'blueprint creator',
      'game tool',
      'factorio utility',
      'video to game',
      'blueprint maker',
      'factorio community',
    ],
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

export default async function VideoConverterLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}