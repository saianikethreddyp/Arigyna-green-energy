import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SuryaTech Logo" width={48} height={48} className="object-contain" />
            <span className="font-heading font-bold text-2xl text-trust-blue tracking-tight">SuryaTech</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/residential" className="text-zinc-600 hover:text-saffron transition-colors font-medium">Residential</Link>
            <Link href="/commercial" className="text-zinc-600 hover:text-saffron transition-colors font-medium">Commercial</Link>
            <Link href="/subsidies" className="text-zinc-600 hover:text-saffron transition-colors font-medium">Subsidies</Link>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:1800123456" className="hidden lg:flex items-center gap-2 text-trust-blue font-semibold">
              <Phone size={20} /> 1800-123-456
            </a>
            <button className="bg-saffron hover:bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
