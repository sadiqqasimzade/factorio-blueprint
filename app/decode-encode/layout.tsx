import Container from "@/components/shared/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Factorio Blueprint Generator - Decode and Encode Factorio Blueprints',
    description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
    keywords: ['factorio blueprint decoder','factorio blueprint encoder',
      'factorio blueprint',
      'blueprint decoder',
      'blueprint encoder',
      'blueprint string decoder',
      'blueprint string encoder',
      'decode blueprint',
      'encode blueprint',
      'blueprint json',
      'blueprint parser',
      'blueprint converter',
      'blueprint tool',
      'factorio',
      'blueprint',
      'decoder',
      'encoder',
      'converter',
      'blueprint reader',
      'blueprint viewer',
      'blueprint editor',
      'blueprint validator',
      'blueprint formatter',
      'factorio utility',
      'game tool',
      'blueprint sharing',
      'blueprint string',
      'factorio community',
      'blueprint manager',
      'blueprint analyzer',
    ],
    alternates: {
        canonical: 'https://factorio-blueprint.vercel.app/decode-encode',
    },
    openGraph: {
        title: 'Factorio Blueprint Generator - Decode and Encode Factorio Blueprints',
        description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        url: 'https://factorio-blueprint.vercel.app/decode-encode',
        type: 'website',
        siteName: 'Factorio Tools',
        locale: 'en_US',
    },
    twitter: {
        title: 'Factorio Blueprint Generator - Decode and Encode Factorio Blueprints',
        description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
        images: ['https://factorio-blueprint.vercel.app/imgs/post_covers/Cover.gif'],
        card: 'summary_large_image',
        site: 'https://factorio-blueprint.vercel.app',
    },
} 

export default async function DecodeEncodeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}