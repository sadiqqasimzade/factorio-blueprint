import Link from "next/link";


export default function Header() {
    return (
        <header className="bg-blue-950">
            <nav className="flex justify-center py-2">
                <Link href='/' className="text-2xl hover:text-blue-400 transition-colors">
                    Factorio Blueprint Generator
                </Link>
            </nav>
        </header>
    )
}