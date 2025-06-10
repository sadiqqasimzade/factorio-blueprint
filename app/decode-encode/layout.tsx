import Container from "@/components/shared/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Factorio Blueprint Decoder & Encoder',
    description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
    openGraph: {
        title: 'Factorio Blueprint Decoder & Encoder',
        description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
    },
    twitter: {
        title: 'Factorio Blueprint Decoder & Encoder',
        description: 'Effortlessly decode and encode Factorio blueprints into readable JSON with this online tool. Simplify your workflow and enhance blueprint management.',
    },
} 

export default function DecodeEncodeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    )
}