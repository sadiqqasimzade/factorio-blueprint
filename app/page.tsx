'use client'

import Card from '@/components/card/card'
import ModalContext from '@/contexts/modal/modalContext'
import { CodeIcon, Grid, ImageIcon, MusicIcon, Palette, Play, Rocket, VideoIcon } from 'lucide-react'

import { useContext, useEffect } from 'react'

export default function Home() {
  const { hideModal, modalIsActive } = useContext(ModalContext)

  useEffect(() => {
    if (modalIsActive()) {
      hideModal()
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }
        
        @keyframes fillProgress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>

        <Card
          title="Decoder and Encoder"
          description="Decode and encode blueprints"
          icon={<CodeIcon className="w-8 h-8 text-green-500" />}
          features={
            [
              'Decode blueprint strings',
              'Encode to shareable format',
              'WIP:Visualize blueprints JSON',
            ]}
          links={[
            { text: "Decode or Encode", href: "decode-encode", icon: <CodeIcon className="w-4 h-4" /> },
          ]}
        >
          <div className="flex flex-col items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded overflow-hidden">
              <div className="animate-pulse">
                <span className="inline-block animate-bounce">0</span>
                {Array.from({ length: 45 }).map((_, i) => {
                  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26) + (Math.random() > 0.5 ? 32 : 0));

                  return (
                    <span key={i} className="inline-block animate-bounce" style={{ animationDelay: `${(i + 1) * 0.05}s` }}>
                      {randomChar}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>Decoding</span>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="w-1 h-1 relative top-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></span>
              ))}
            </div>
          </div>



        </Card>

        <Card
          title="Image Converters"
          description="Convert images to blueprints"
          icon={<ImageIcon className="w-8 h-8 text-green-500" />}
          features={
            [
              'PNG, JPG, GIF, WEBP, SVG and more support',
              'Automatic color mapping',
              'Custom tile selection',
              'Scaling optimization',
            ]}
          links={[
            { text: "Image to Tile", href: "image-converter-tile", icon: <Grid className="w-4 h-4" /> },
            { text: "Image to Lamp", href: "image-converter-lamp", icon: <ImageIcon className="w-4 h-4" /> },
          ]}
        >
          <div className="grid grid-cols-8 gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-sm ${Math.random() > 0.7 ? "bg-green-500" : "bg-gray-600"} animate-pulse`}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-green-500 font-medium bg-gray-900 px-2 py-1 rounded shadow-lg">
              Blueprint Preview
            </span>
          </div>
        </Card>


        <Card
          title="Space Platform Converter"
          description="Convert images to space platforms"
          icon={<Rocket className="w-8 h-8 text-green-500" />}
          features={
            [
              'Space Platform layouts',
            ]}
          links={[
            { text: "Space Platform", href: "image-converter-platform", icon: <Rocket className="w-4 h-4" /> },
          ]}
        >
          <div className="relative opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 border-2 border-green-500/30 rounded-lg flex items-center justify-center">
              <Rocket
                className="w-6 h-6 text-green-500"
                style={{
                  animation: 'orbit 8s linear infinite',
                  transformOrigin: 'center',
                }}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500/60 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-green-500 font-medium bg-gray-900 px-2 py-1 rounded shadow-lg">
              Space Platform
            </span>
          </div>
        </Card>



        <Card
          title="Pixel Art converters"
          description="Convert pixel art to blueprints"
          icon={<Palette className="w-8 h-8 text-green-500" />}
          features={
            [
              'Pixel Art to Tile',
              'Pixel Art to Lamp',
            ]}
          links={[
            { text: "Pixel Art to Tile", href: "pixel-art-tile", icon: <Grid className="w-4 h-4" /> },
            { text: "Pixel Art to Lamp", href: "pixel-art-lamp", icon: <ImageIcon className="w-4 h-4" /> },
          ]}
        >
          <div className="grid grid-cols-8 gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${Math.random() > 0.7 ? "bg-green-500" : "bg-gray-600"} animate-pulse`}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-green-500 font-medium bg-gray-900 px-2 py-1 rounded shadow-lg">
              Pixel Art
            </span>
          </div>
        </Card>


        <Card
          title="Video Converter"
          description="Convert video to blueprint"
          icon={<VideoIcon className="w-8 h-8 text-green-500" />}
          features={
            [
              'Video to Lamp',
              'MP4, AVI, MOV and more support',
              'Frame extraction',
              'Animation sequencing',
              'Pattern optimization',
            ]}
          links={[
            { text: "Video to Lamp", href: "video-converter", icon: <VideoIcon className="w-4 h-4" /> },
          ]}
        >
          <div className='flex flex-col items-center gap-2'>

            <div className="flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-green-500 animate-pulse" />
              <div className="text-xs text-green-500">Processing frames...</div>
            </div>
            <div className="w-full rounded-full h-3 mb-2 relative overflow-hidden bg-gray-700">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: '0%',
                  animation: 'fillProgress 3s ease-in-out infinite '
                }}
              />
            </div>
            <div className="text-xs text-green-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Frame 24/60 → Blueprint
            </div>
          </div>
        </Card>

        <div className='hidden'>
          <Card

            title="Audio Converter"
            description="Convert audio to blueprints"
            icon={<MusicIcon className="w-8 h-8 text-green-500" />}
            features={
              [
                'Audio to Lamp',
                'Midi support',
                'Custom audio sequencer',
              ]}
            links={[
              { text: "Audio Sequencer", href: "audio-converter", icon: <MusicIcon className="w-4 h-4" /> },
            ]}
          >
            <div className="grid grid-cols-8 gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm border border-green-500/30 animate-sequencer-step`}
                  style={{ animationDelay: `${(i % 8) * 0.1}s` }}
                />
              ))}
            </div>
            <div className="absolute top-2 left-2 text-xs text-green-500/60 font-mono">BPM: 120</div>
            <div className="absolute bottom-2 right-2 text-xs text-green-500/60 font-mono">4/4</div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-green-500 font-medium bg-gray-900 px-2 py-1 rounded shadow-lg">
                Pattern Sequencing
              </span>
            </div>
          </Card>

        </div>

      </div>
    </>
  )
}
