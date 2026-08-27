import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { Sparkles, ArrowDownRight, ShieldCheck, Zap, Award, Gauge, MapPin, Compass, ChevronRight } from 'lucide-react';
import { QuickBookingWidget } from './QuickBookingWidget';

export const HeroSection = () => {
  const { setSelectedCarForModal, setSelectedCarForDetail, cars, formatPrice, isAdmin } = useRental();
  const featuredCar = cars.find(c => c.id === 'car-1') || cars[0];

  return (
    <section id="hero" className="relative pt-6 pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Clean Indian Car Rental Title */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-amber-800 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Available in Mumbai • Pune • Goa • Bangalore • Delhi NCR • Hyderabad</span>
          </div>

          {/* Simple Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            Rent Self-Drive & <br />
            <span className="text-amber-600">Cars with Driver in India</span>
          </h1>

          {/* Simple Description */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
            Simple, hassle-free car rentals across major Indian cities. Choose from hatchbacks, compact SUVs, luxury sedans, and 4x4 off-roaders with transparent daily rates in ₹ INR.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#fleet"
              className="px-7 py-3.5 rounded-full bg-amber-600 text-white font-syne font-bold text-xs tracking-wider uppercase hover:bg-amber-700 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Browse All Available Cars</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            {!isAdmin && featuredCar && (
              <button
                onClick={() => setSelectedCarForModal(featuredCar)}
                className="px-6 py-3.5 rounded-full glass-panel border-slate-200 hover:border-amber-400 text-slate-800 font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Book {featuredCar.title}</span>
                <span className="text-amber-700 font-bold">{formatPrice(featuredCar.pricePerDay)}/day</span>
              </button>
            )}
          </div>

          {/* Core Service Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px] uppercase block">No Hidden Charges</span>
              <span className="text-slate-900 font-bold">Transparent Rates</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Flexible Options</span>
              <span className="text-amber-700 font-bold">Self-Drive & Driver</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase block">Support</span>
              <span className="text-slate-900 font-bold">24/7 Roadside Assist</span>
            </div>
          </div>

        </div>

        {/* Right Column: Featured Vehicle Card */}
        <div className="lg:col-span-5">
          <div className="glass-panel rounded-3xl overflow-hidden border-slate-200 p-5 space-y-4 shadow-lg">
            
            {/* Vehicle Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100">
              <img 
                src={featuredCar.images[0]} 
                alt={featuredCar.title} 
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-amber-400 font-bold">
                Most Popular SUV
              </span>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{featuredCar.brand} • {featuredCar.powertrain}</span>
                  <h3 className="font-syne text-xl font-bold text-slate-900">{featuredCar.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Daily Rate</span>
                  <span className="font-mono text-xl font-extrabold text-amber-600">{formatPrice(featuredCar.pricePerDay)}</span>
                </div>
              </div>

              {/* Specs Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-center">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  <span className="block text-[9px] text-slate-500 uppercase">Seats</span>
                  <span className="text-slate-900 font-bold">{featuredCar.specs.seats} Seater</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  <span className="block text-[9px] text-slate-500 uppercase">Gearbox</span>
                  <span className="text-slate-900 font-bold">{featuredCar.specs.transmission}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  <span className="block text-[9px] text-slate-500 uppercase">Power</span>
                  <span className="text-amber-600 font-bold">{featuredCar.specs.horsepower}</span>
                </div>
              </div>

              {/* Action: Only for customers */}
              {!isAdmin && (
                <button
                  onClick={() => setSelectedCarForModal(featuredCar)}
                  className="w-full py-3 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-all cursor-pointer shadow-sm"
                >
                  Book {featuredCar.model}
                </button>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* Quick Booking Widget */}
      <div className="mt-10">
        <QuickBookingWidget />
      </div>

    </section>
  );
};

