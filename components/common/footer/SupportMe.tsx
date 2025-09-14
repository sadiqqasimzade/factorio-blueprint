import { Heart, Coffee } from "lucide-react";
import Link from "next/link";

export default function SupportMe() {
    return (
        <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">Support this project:</span>
            </div>
            <Link
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
                href="https://buymeacoffee.com/polar.bear"
                target="_blank"
            >
                <Coffee className="w-4 h-4 text-yellow-400" />
                <span>Buy Me a Coffee</span>
            </Link>
        </div>
    );
};
