import Image from "next/image";
import Navbar from "@/components/Navbar";
import { TrendingUp, Factory, ShieldCheck, Settings } from "lucide-react";

export default function Commercial() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-white">
        {/* Commercial Hero */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image src="/commercial.png" alt="Industrial Solar Factory" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <div className="inline-block bg-saffron/90 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
                B2B INDUSTRIAL SOLUTIONS
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-extrabold leading-tight mb-6 text-white drop-shadow-md">
                Turn Your Roof Into a Profit Center.
              </h1>
              <p className="text-xl text-zinc-300 mb-8 font-light leading-relaxed">
                High-efficiency EPC solar solutions for factories and commercial spaces. Cut operating expenses by up to 80% and claim massive tax benefits through accelerated depreciation.
              </p>
              <button className="bg-trust-blue hover:bg-blue-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl">
                Consult our EPC Experts
              </button>
            </div>
          </div>
        </section>

        {/* B2B Benefits */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-heading font-bold text-trust-blue mb-4">The Smart Business Move</h2>
              <p className="text-lg text-zinc-600">Discover why India's leading manufacturers are partnering with SuryaTech.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, title: "Accelerated Depreciation", desc: "Claim up to 40% tax benefits in the first year under section 32 of the IT Act." },
                { icon: Factory, title: "OPEX Reduction", desc: "Lock in your energy rates and protect your margins from grid tariff hikes." },
                { icon: ShieldCheck, title: "Tier-1 Quality", desc: "Only the highest grade bifacial modules and central inverters for maximum yield." },
                { icon: Settings, title: "End-to-End EPC", desc: "From site survey and design to DISCOM approvals and lifetime O&M." },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-trust-blue" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-zinc-900 mb-3">{feature.title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Showcase */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-heading font-bold text-trust-blue mb-6">Enterprise Monitoring</h2>
              <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                Track your energy production, grid export, and real-time financial savings down to the rupee. Our advanced telemetry dashboard gives your operations team complete visibility and control over your energy infrastructure.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-zinc-700"><span className="w-2 h-2 bg-eco-green rounded-full"></span> Real-time active power monitoring</li>
                <li className="flex items-center gap-3 text-zinc-700"><span className="w-2 h-2 bg-eco-green rounded-full"></span> Automated fault detection & alerts</li>
                <li className="flex items-center gap-3 text-zinc-700"><span className="w-2 h-2 bg-eco-green rounded-full"></span> ESG compliance reporting exports</li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/dashboard.png" alt="Corporate Solar Dashboard" width={800} height={800} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
