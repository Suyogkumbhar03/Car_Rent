import React from 'react';
import { ShieldCheck, Truck, Sparkles, Trophy, Award, MapPin, Compass, Clock, ArrowRight } from 'lucide-react';

export const ExperienceSection = () => {
  return (
    <section id="experiences" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Why Rent With <span className="text-amber-600">Us?</span>
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
          Hassle-free car rental experience with verified vehicles, doorstep delivery, and transparent daily rates across India.
        </p>
      </div>

      {/* 3 Simple Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pillar 1 */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 border-slate-200 shadow-md flex flex-col justify-between hover:border-amber-400 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Convenience</span>
              <h3 className="font-syne text-lg font-bold text-slate-900">Doorstep & Airport Delivery</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              Get your car delivered directly to your home, hotel, or airport terminal in Mumbai, Pune, Goa, Bangalore, Delhi NCR, and Hyderabad.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 font-mono text-[11px] text-amber-700 font-semibold">
            <span>Free Terminal Pickup Available</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 border-slate-200 shadow-md flex flex-col justify-between hover:border-amber-400 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Safety & Insurance</span>
              <h3 className="font-syne text-lg font-bold text-slate-900">Fully Insured & Maintained</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              Every car undergoes multi-point safety checks, regular oil & brake servicing, and includes 100% comprehensive insurance coverage.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 font-mono text-[11px] text-emerald-700 font-semibold">
            <span>100% Insured Fleet</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 border-slate-200 shadow-md flex flex-col justify-between hover:border-amber-400 transition-all">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Support</span>
              <h3 className="font-syne text-lg font-bold text-slate-900">24/7 Highway Assistance</h3>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              Dedicated customer support team available 24/7 to assist you during your road trips, weekend getaways, or daily commutes.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 font-mono text-[11px] text-blue-700 font-semibold">
            <span>24/7 Helpline Available</span>
          </div>
        </div>

      </div>

    </section>
  );
};

