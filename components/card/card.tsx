import Link from 'next/link'
import { Settings } from 'lucide-react'
import { PropsWithChildren } from 'react';

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  links: { text: string, href: string, icon: React.ReactNode }[];
};

export default function Card({ title, description, icon, features, children, links }: PropsWithChildren<Props>) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-600 hover:border-green-500 transition-all duration-300 group relative z-10 hover:-translate-y-2 overflow-hidden flex flex-col">
      {/* Shimmer effect overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500/30 transition-colors relative">
          {icon}
          <Settings className="w-4 h-4 text-green-500/60 absolute -top-1 -right-1 animate-spin" />
        </div>
        <h4 className="text-lg font-bold text-gray-100">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:shadow-green-500/20">
        {children}
      </div>

      <ul className="space-y-2 mb-4 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 flex-col md:flex-row">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="w-full block bg-green-700 hover:bg-green-600 text-white font-medium py-2 px-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/30">
            <span className="relative flex items-center justify-center gap-2">
              {link.icon}
              {link.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}