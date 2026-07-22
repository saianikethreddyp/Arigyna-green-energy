import Image from "next/image";
import Navbar from "@/components/Navbar";
import RoiCalculator from "@/components/RoiCalculator";

export default function Residential() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-zinc-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-trust-blue mb-6">
              Home Solar Solutions
            </h1>
            <p className="text-lg text-zinc-600">
              Transform your rooftop into a clean power plant. Protect your family from rising energy costs and power cuts with our premium battery-integrated solar systems.
            </p>
          </div>

          <div className="mb-24">
            <RoiCalculator />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-trust-blue mb-6">Premium Hybrid Inverter Systems</h2>
              <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                Experience true energy independence. Our state-of-the-art battery and hybrid inverter setups ensure that your home stays powered even during grid outages, while storing excess solar energy for nighttime use.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-zinc-700"><span className="w-2 h-2 bg-saffron rounded-full"></span> Seamless power backup during cuts</li>
                <li className="flex items-center gap-3 text-zinc-700"><span className="w-2 h-2 bg-saffron rounded-full"></span> Lithium-ion batteries with 10-year warranty</li>
                <li className="flex items-center gap-3 text-zinc-700"><span className="w-2 h-2 bg-saffron rounded-full"></span> Smart mobile app monitoring</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image src="/battery.png" alt="Modern Solar Battery" width={800} height={800} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
