import Image from "next/image";
import Navbar from "@/components/Navbar";
import { CheckCircle, FileText, Landmark, Sun, Settings } from "lucide-react";

export default function Subsidies() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-zinc-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-orange-100 text-saffron px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
              GOVERNMENT INITIATIVE
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-trust-blue mb-6">
              PM Surya Ghar Muft Bijli Yojana
            </h1>
            <p className="text-lg text-zinc-600">
              The Indian Government is empowering homeowners to generate their own clean energy. Claim up to ₹78,000 in direct bank transfers when you install a rooftop solar plant with SuryaTech.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-heading font-bold text-zinc-900 mb-8 border-b border-zinc-100 pb-6">Subsidy Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
                <p className="text-lg font-bold text-zinc-900 mb-2">Up to 1 kW System</p>
                <p className="text-3xl font-heading font-bold text-saffron mb-2">₹30,000</p>
                <p className="text-sm text-zinc-600">Fixed subsidy amount</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center relative transform md:-translate-y-4 shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-eco-green text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
                <p className="text-lg font-bold text-zinc-900 mb-2 mt-4">2 kW System</p>
                <p className="text-4xl font-heading font-bold text-saffron mb-2">₹60,000</p>
                <p className="text-sm text-zinc-600">Fixed subsidy amount</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
                <p className="text-lg font-bold text-zinc-900 mb-2">3 kW & Above</p>
                <p className="text-3xl font-heading font-bold text-saffron mb-2">₹78,000</p>
                <p className="text-sm text-zinc-600">Maximum cap on subsidy</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-trust-blue mb-8">The 4-Step Claim Process</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-trust-blue rounded-full flex items-center justify-center font-bold text-xl shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2"><Landmark className="w-5 h-5 text-saffron"/> Portal Registration</h3>
                    <p className="text-zinc-600">We assist you in registering on the National Portal with your State Electricity Distribution Company (DISCOM) consumer number.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-trust-blue rounded-full flex items-center justify-center font-bold text-xl shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2"><Settings className="w-5 h-5 text-saffron"/> Installation & Net Metering</h3>
                    <p className="text-zinc-600">SuryaTech, an approved vendor, executes the flawless installation. We then apply for net metering on your behalf.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-trust-blue rounded-full flex items-center justify-center font-bold text-xl shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-saffron"/> Commissioning Certificate</h3>
                    <p className="text-zinc-600">Once net metering is installed, DISCOM officials inspect the site and generate the commissioning certificate.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-eco-green text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0"><CheckCircle className="w-6 h-6"/></div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2">Subsidy Credited</h3>
                    <p className="text-zinc-600">Submit your bank details via the portal. The subsidy amount is directly credited to your account within 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-trust-blue p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <Sun className="absolute -top-10 -right-10 w-48 h-48 text-white/10" />
              <h3 className="text-3xl font-heading font-bold mb-6 relative z-10">Don't want the paperwork hassle?</h3>
              <p className="text-blue-100 text-lg mb-8 relative z-10">
                At SuryaTech, our dedicated legal and liaison team handles the entire documentation, DISCOM follow-ups, and subsidy application process for you. 
              </p>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3"><CheckCircle className="text-saffron w-5 h-5" /> 100% Free Consultation</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-saffron w-5 h-5" /> Guaranteed Approvals</li>
                <li className="flex items-center gap-3"><CheckCircle className="text-saffron w-5 h-5" /> Track Status on App</li>
              </ul>
              <button className="bg-saffron hover:bg-orange-500 w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg relative z-10 text-white">
                Start My Application Now
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
