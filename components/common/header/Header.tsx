import { Cog } from "lucide-react";
import Link from "next/link";


//force

export default function Header() {
    return (
        <header className="border-b bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-center">
                <div className="p-2 rounded-lg bg-gradient-factory">
                    <Link href='/' className="flex items-center justify-center">
                        <Cog className="w-8 h-8 animate-spin text-white hover:text-blue-400 transition-colors" style={{ animationDuration: '8s' }} />
                    </Link>
                </div>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-center md:text-left hover:text-blue-400 transition-colors">
                        <Link href='/'>
                            Factorio Blueprint Generator
                        </Link>
                    </h1>
                    <p className="md:block hidden text-sm">
                        Free blueprint generators for your factory
                    </p>
                </div>
            </div>
        </header>
    )
}