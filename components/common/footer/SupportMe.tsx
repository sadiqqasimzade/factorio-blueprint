import { Coffee, Heart } from "lucide-react";
import Link from "next/link";

export default function SupportMe() {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-linear-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-red-400 animate-pulse" />
                        <span className="text-sm font-medium text-purple-200">Support this project:</span>
                    </div>
                    <Link
                        className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse hover:animate-none"
                        href="https://buymeacoffee.com/polar.bear"
                        target="_blank"
                    >
                        <Coffee className="w-5 h-5" />
                        <span>Buy Me a Coffee</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
