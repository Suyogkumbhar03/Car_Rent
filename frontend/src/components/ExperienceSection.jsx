import React from 'react';
import { ShieldCheck, Truck, Leaf, Sparkles, Trophy, Award } from 'lucide-react';

export const ExperienceSection = () => {
  return (
    <section id="experiences" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Editorial Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E2F163]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Concierge & Philosophy</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Beyond Ordinary <span className="italic font-normal text-[#E2F163]">Rental.</span>
        </h2>
        <p className="text-slate-300/80 text-xs sm:text-sm font-sans leading-relaxed">
          We curate high-performance driving experiences with white-glove logistics, race telemetry tracking, and zero-compromise environmental stewardship.
        </p>
      </div>

      {/* 3 Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="glass-panel rounded-3xl p-8 space-y-5 border-white/10 hover:border-[#E2F163]/40 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-2xl bg-[#E2F163]/10 border border-[#E2F163]/30 text-[#E2F163] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-syne text-xl font-bold text-white">24/7 Enclosed Concierge Delivery</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            Have your Porsche or Ferrari delivered direct to your private hangar, St. Moritz chalet, or Zurich lakefront residence in climate-controlled enclosed transporters.
          </p>
          <div className="pt-2 border-t border-white/10 font-mono text-[11px] text-[#E2F163] flex items-center gap-1">
            <span>Zurich • Geneva • St. Moritz</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel rounded-3xl p-8 space-y-5 border-white/10 hover:border-[#E2F163]/40 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="font-syne text-xl font-bold text-white">Track Telemetry & Pit Support</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            Our track-specification GT vehicles come pre-configured with GPS lap logging, tire thermal sensors, and access to certified chassis engineers.
          </p>
          <div className="pt-2 border-t border-white/10 font-mono text-[11px] text-white flex items-center gap-1">
            <span>Passo dello Stelvio Approved</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel rounded-3xl p-8 space-y-5 border-white/10 hover:border-[#E2F163]/40 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-syne text-xl font-bold text-white">100% Certified Carbon Offset</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            Every kilometer driven in our V8 or V12 fleet is automatically offset through verified Gold Standard Swiss reforestation and alpine solar projects.
          </p>
          <div className="pt-2 border-t border-white/10 font-mono text-[11px] text-emerald-400 flex items-center gap-1">
            <span>Net-Zero Footprint Guaranteed</span>
          </div>
        </div>

      </div>

    </section>
  );
};
