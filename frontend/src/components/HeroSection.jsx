import React from 'react';
import { useRental } from '../context/RentalContext';
import { Sparkles, ArrowDownRight, ShieldCheck, Zap, Award, Gauge } from 'lucide-react';
import { QuickBookingWidget } from './QuickBookingWidget';

export const HeroSection = () => {
  const { setSelectedCarForModal, cars, formatPrice } = useRental();
  const featuredCar = cars.find(c => c.id === 'car-1') || cars[0];

  return (
    <section id="hero" className="relative pt-8 pb-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E2F163]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-[#FF6B00]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Grand Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E2F163]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zurich & Geneva Edition • 2026</span>
            </div>

            {/* Editorial Title */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              The Automotive <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E2F163] via-white to-slate-300">
                Editorial Fleet.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              Precision-curated supercars, high-output GTs, and silent ultra-EVs. Tailored for discerning drivers seeking uncompromised dynamics, track-side delivery, and concierge exclusivity.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#fleet"
              className="px-7 py-3.5 rounded-full bg-[#E2F163] text-black font-heading font-bold text-sm tracking-wide hover:bg-[#d4e450] hover:shadow-[0_0_30px_rgba(226,241,99,0.35)] transition-all flex items-center gap-2 group"
            >
              <span>Explore The Fleet</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {featuredCar && (
              <button
                onClick={() => setSelectedCarForModal(featuredCar)}
                className="px-6 py-3.5 rounded-full glass-panel border-white/10 hover:border-[#E2F163]/50 text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>Instant Reserve: {featuredCar.brand}</span>
                <span className="text-[#E2F163] font-bold">{formatPrice(featuredCar.pricePerDay)}/day</span>
              </button>
            )}
          </div>

          {/* Stats Ticker Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Fleet Status</span>
              <span className="text-white font-bold text-sm">100% Verified</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Telemetry</span>
              <span className="text-[#E2F163] font-bold text-sm">Live Track Lock</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Carbon Footprint</span>
              <span className="text-white font-bold text-sm">Net Zero Offset</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="lg:col-span-5 relative group min-h-[380px]">
          <div className="w-full h-full glass-panel rounded-3xl overflow-hidden relative border-white/10 group-hover:border-[#E2F163]/30 transition-all duration-500 flex flex-col justify-end p-6">
            
            {/* Background Image Showcase */}
            <img 
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop" 
              alt="Porsche 911 GT3 RS Showcase" 
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 brightness-90"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/40 to-transparent" />

            {/* Top Badge overlay */}
            <div className="absolute top-5 right-5 glass-panel rounded-full px-3 py-1 text-[11px] font-mono text-[#E2F163] border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E2F163] animate-ping" />
              <span>FEATURED VEHICLE</span>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#E2F163] text-black font-mono text-[10px] font-bold uppercase">
                  TRACK EDITION
                </span>
                <span className="text-xs font-mono text-slate-300">PORSCHE 911 GT3 RS</span>
              </div>
              
              <div className="flex items-baseline justify-between">
                <h3 className="font-syne text-2xl font-bold text-white">525 HP • 3.2s 0-100</h3>
                <span className="font-mono text-lg font-bold text-[#E2F163]">
                  {featuredCar ? formatPrice(featuredCar.pricePerDay) : '$1,250'}<span className="text-xs text-slate-400 font-normal">/day</span>
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Top Speed: 312 km/h</span>
                <span>Active Aero DRS</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Quick Booking Widget directly underneath */}
      <div className="mt-12">
        <QuickBookingWidget />
      </div>

    </section>
  );
};
