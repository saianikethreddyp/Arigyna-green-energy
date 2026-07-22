import Image from "next/image";
import { Sun, CheckCircle, IndianRupee, Shield, Battery, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image src="/hero.png" alt="Beautiful Solar Rooftop" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/90 via-trust-blue/70 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <div className="inline-block bg-eco-green/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 animate-pulse">
                🇮🇳 INDIA'S #1 SOLAR EXPERTS
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight mb-6 text-white drop-shadow-md">
                Power Your Home. <br />
                <span className="text-saffron drop-shadow-md">Zero Your Bills.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-100 mb-8 font-light leading-relaxed">
                Join the solar revolution. Save up to 90% on electricity bills and claim government subsidies up to <span className="font-semibold text-white">₹78,000</span> with PM Surya Ghar Yojana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-saffron hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                  Check Your Subsidy <ArrowRight size={20} />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                  View Commercial Plans
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Solar Section */}
        <section className="py-24 bg-zinc-50" id="residential">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-heading font-bold text-trust-blue mb-4">Why Switch to SuryaTech?</h2>
              <p className="text-lg text-zinc-600">We make transitioning to solar energy simple, affordable, and profitable for Indian households and businesses.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IndianRupee className="w-8 h-8 text-eco-green" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-zinc-900 mb-3">Massive Savings</h3>
                <p className="text-zinc-600 leading-relaxed">Cut your electricity bill by up to 90% from month one. ROI in just 3-4 years.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-trust-blue" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-zinc-900 mb-3">25-Year Warranty</h3>
                <p className="text-zinc-600 leading-relaxed">Tier-1 solar modules engineered to withstand Indian weather conditions, guaranteed.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sun className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-zinc-900 mb-3">Hassle-Free Subsidy</h3>
                <p className="text-zinc-600 leading-relaxed">We handle 100% of the paperwork for the PM Surya Ghar Yojana subsidy approval.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Creative / Family Section */}
        <section className="py-24 bg-white" id="subsidies">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/ad_creative.png" alt="Happy Indian family with zero electricity bill" width={800} height={800} className="w-full h-auto object-cover" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="bg-eco-green w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">The Sharma Family, Delhi</p>
                        <p className="font-heading font-bold text-xl text-zinc-900">"Our summer electricity bill went from ₹8,500 to ZERO!"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="inline-block bg-orange-100 text-saffron px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
                  GOVERNMENT INITIATIVE
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-trust-blue mb-6 leading-tight">
                  Claim Your ₹78,000 Subsidy Today
                </h2>
                <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                  Under the <span className="font-semibold text-zinc-900">PM Surya Ghar Muft Bijli Yojana</span>, the government is paying you to go solar. Don't miss this limited-time opportunity to secure your family's energy independence.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-eco-green w-6 h-6 shrink-0" />
                    <span className="text-zinc-700 font-medium text-lg">Up to ₹78,000 direct bank transfer subsidy</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-eco-green w-6 h-6 shrink-0" />
                    <span className="text-zinc-700 font-medium text-lg">300 units of free electricity every month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-eco-green w-6 h-6 shrink-0" />
                    <span className="text-zinc-700 font-medium text-lg">Net-metering setup included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-eco-green w-6 h-6 shrink-0" />
                    <span className="text-zinc-700 font-medium text-lg">100% assistance with DISCOM approvals</span>
                  </li>
                </ul>
                <button className="bg-trust-blue hover:bg-blue-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                  Check My Eligibility <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Banner */}
        <section className="py-20 bg-zinc-900 text-white" id="commercial">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Battery className="w-16 h-16 text-saffron mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Running a Business? Cut Operating Costs by 80%</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              SuryaTech provides end-to-end EPC solutions for factories, warehouses, and commercial spaces. Claim accelerated depreciation (tax benefits) and achieve your sustainability goals.
            </p>
            <button className="bg-transparent border-2 border-saffron text-saffron hover:bg-saffron hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              Consult a Commercial Expert
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="SuryaTech Logo" width={32} height={32} className="object-contain grayscale opacity-50" />
            <span className="font-heading font-bold text-xl text-zinc-400">SuryaTech</span>
          </div>
          <p className="text-zinc-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} SuryaTech Solar India. All rights reserved.
          </p>
          <div className="flex space-x-6 text-zinc-400">
            <a href="#" className="hover:text-trust-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-trust-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
