import { Github, Heart, Wrench } from "lucide-react";
import SupportMe from "./SupportMe";
import Link from "next/link";


const tools = [
  {
    name: "Image to Blueprint",
    description: "Convert images to Factorio blueprints",
    link: "/image-to-blueprint",
  },

  {
    name: "Video to Blueprint",
    description: "Convert videos to Factorio blueprints",
    link: "/video-to-blueprint",
  },

  {
    name: "Audio to Blueprint",
    description: "Convert audio to Factorio blueprints",
    link: "/audio-to-blueprint",
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 border-neutral-500 mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold text-yellow-200">About</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Free tools for the Factorio community to generate blueprints from various media formats.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-yellow-200 mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              {tools.map((tool) => (
                <li key={tool.name}>
                  <Link href={tool.link} className="text-white hover:text-blue-400 transition-colors">{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-yellow-200 mb-4">Community</h3>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/sadiqqasimzade/factorio-blueprint"
                target="_blank"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-500 mt-8 pt-6">
          <div className="flex flex-col items-center space-y-4">
            <SupportMe />
            <div className="flex items-center space-x-2 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4" />
              <span>for the Factorio community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
