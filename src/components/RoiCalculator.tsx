"use client";

import { useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";

export default function RoiCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(5000);
  
  // Rough calculations for Indian context
  const annualBill = monthlyBill * 12;
  const systemSizeKw = Math.max(1, Math.round(monthlyBill / 1000)); // Rough estimate
  const estimatedCost = systemSizeKw * 60000; // ~60k per kW
  const subsidy = Math.min(78000, systemSizeKw * 30000); // Max 78k subsidy
  const netCost = estimatedCost - subsidy;
  const annualSavings = annualBill * 0.9; // 90% savings
  const paybackPeriod = (netCost / annualSavings).toFixed(1);
  const total25YearSavings = annualSavings * 25 - netCost;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-100 pb-6">
        <div className="bg-trust-blue text-white p-3 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-trust-blue">ROI Savings Calculator</h3>
      </div>

      <div className="mb-8">
        <label className="block text-zinc-600 font-medium mb-3">Average Monthly Electricity Bill (₹)</label>
        <div className="flex items-center gap-4">
          <IndianRupee className="text-zinc-400 w-5 h-5" />
          <input
            type="range"
            min="1000"
            max="30000"
            step="500"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="w-full accent-saffron"
          />
          <span className="font-bold text-xl text-zinc-900 w-24 text-right">₹{monthlyBill.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-zinc-50 p-6 rounded-2xl">
          <p className="text-sm text-zinc-500 font-medium mb-1">Recommended System</p>
          <p className="text-2xl font-bold text-zinc-900">{systemSizeKw} kW</p>
        </div>
        <div className="bg-zinc-50 p-6 rounded-2xl">
          <p className="text-sm text-zinc-500 font-medium mb-1">Estimated Subsidy</p>
          <p className="text-2xl font-bold text-eco-green">₹{subsidy.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-50 p-6 rounded-2xl">
          <p className="text-sm text-zinc-500 font-medium mb-1">Net Cost (After Subsidy)</p>
          <p className="text-2xl font-bold text-zinc-900">₹{netCost.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <p className="text-sm text-saffron font-medium mb-1">Payback Period</p>
          <p className="text-2xl font-bold text-saffron">{paybackPeriod} Years</p>
        </div>
      </div>

      <div className="bg-trust-blue text-white p-6 rounded-2xl text-center">
        <p className="text-blue-200 font-medium mb-2">Estimated 25-Year Net Savings</p>
        <p className="text-4xl font-heading font-bold text-saffron drop-shadow-md">
          ₹{total25YearSavings.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
