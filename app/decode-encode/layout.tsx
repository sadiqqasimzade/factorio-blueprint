import Container from "@/components/shared/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Factorio Blueprint Generator - Decode and Encode Factorio Blueprints',
    description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
    keywords: ['factorio blueprint decoder', 'factorio blueprint encoder', 'factorio blueprint', 'factorio', 'blueprint', 'decoder', 'encoder', 'converter'],
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

export default function DecodeEncodeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}