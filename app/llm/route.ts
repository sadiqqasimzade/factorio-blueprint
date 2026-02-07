import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 86400 // Revalidate once per day

export async function GET() {
  const baseUrl = 'https://factorio-blueprint.vercel.app'

  const llmMetadata = {
    name: 'Factorio Blueprint Generator',
    description:
      'A comprehensive suite of free web-based tools for the Factorio community. Convert images, videos, and create pixel art to generate Factorio blueprints. Features include image-to-blueprint conversion, video-to-blueprint conversion, pixel art creation, and blueprint encoding/decoding.',
    url: baseUrl,
    features: [
      {
        name: 'Image to Blueprint Converter',
        description: 'Convert PNG, JPG, GIF, WEBP, and SVG images into Factorio blueprints',
        url: `${baseUrl}/image-converter-tile`,
        capabilities: ['Tile-based conversion', 'Lamp-based conversion', 'Platform-based conversion'],
      },
      {
        name: 'Video to Blueprint Converter',
        description: 'Convert videos and GIFs into animated Factorio blueprints',
        url: `${baseUrl}/video-converter`,
        capabilities: ['Frame extraction', 'Animation sequencing', 'Pattern optimization'],
      },
      {
        name: 'Pixel Art Creator',
        description: 'Create pixel art designs for Factorio blueprints',
        url: `${baseUrl}/pixel-art-tile`,
        capabilities: ['Tile-based pixel art', 'Lamp-based pixel art'],
      },
      {
        name: 'Blueprint Decoder/Encoder',
        description: 'Decode and encode Factorio blueprint strings',
        url: `${baseUrl}/decode-encode`,
        capabilities: ['Blueprint decoding', 'Blueprint encoding', 'JSON visualization'],
      },
    ],
    creator: {
      name: 'Sadiq Qasimzade',
    },
    category: 'Game Tools',
    pricing: 'Free',
    technologies: ['Next.js', 'React', 'TypeScript', 'Web Workers'],
    lastUpdated: new Date().toISOString(),
  }

  return NextResponse.json(llmMetadata, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
