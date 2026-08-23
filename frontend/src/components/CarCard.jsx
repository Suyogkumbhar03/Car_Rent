import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { 
  Zap, 
  Gauge, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Calendar, 
  ShieldAlert, 
  Users, 
  Flame, 
  Info,
  CheckCircle2
} from 'lucide-react';

export const CarCard = ({ car, viewMode = 'grid' }) => {
  const { 
    formatPrice, 
    setSelectedCarForModal, 
    setSelectedCarForDetail 
  } = useRental();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div 
      className={`glass-panel rounded-3xl overflow-hidden group transition-all duration-300 border-white/10 hover:border-[#E2F163]/40 flex flex-col justify-between ${
        viewMode === 'list' ? 'md:flex-row' : ''
      }`}
    >
      
      {/* Top Image Carousel Container */}
      <div className={`relative overflow-hidden bg-neutral-900 ${viewMode === 'list' ? 'md:w-5/12 h-64 md:h-auto' : 'h-64'}`}>
        
        {/* Main Image */}
        <img 
          src={car.images[activeImageIndex] || car.images[0]} 
          alt={car.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11]/90 via-transparent to-[#0B0D11]/30 pointer-events-none" />

        {/* Availability Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border flex items-center gap-1.5 backdrop-blur-md ${
            car.isAvailable 
              ? 'bg-[#E2F163]/20 border-[#E2F163]/50 text-[#E2F163]' 
              : 'bg-red-500/20 border-red-500/50 text-red-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-[#E2F163] animate-pulse' : 'bg-red-400'}`} />
            {car.availabilityNotice || (car.isAvailable ? 'Available' : 'Reserved')}
          </span>
        </div>

        {/* Category & Powertrain Badges */}
        <div className="absolute top-4 right-4 z-10 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
            {car.powertrain}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
            {car.category}
          </span>
        </div>

        {/* Carousel Controls */}
        {car.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button 
              onClick={prevImage}
              className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#E2F163] hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#E2F163] hover:text-black transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Dots Indicator */}
        {car.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {car.images.map((_, idx) => (
              <span 
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-5 bg-[#E2F163]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Card Content Details */}
      <div className={`p-6 flex-1 flex flex-col justify-between space-y-5 ${viewMode === 'list' ? 'md:w-7/12' : ''}`}>
        
        <div className="space-y-3">
          
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block">
                {car.brand} • {car.year}
              </span>
              <h3 className="font-syne text-xl font-bold text-white group-hover:text-[#E2F163] transition-colors">
                {car.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-mono">
              <Star className="w-3.5 h-3.5 fill-[#E2F163] text-[#E2F163]" />
              <span className="text-white font-bold">{car.rating}</span>
              <span className="text-slate-500 text-[10px]">({car.reviewsCount})</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans">
            {car.description}
          </p>

          {/* Spec Strip with Glyph Icons */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[11px] font-mono">
            <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
              <span className="block text-[9px] text-slate-400 uppercase">Top Speed</span>
              <span className="text-white font-bold">{car.specs.speed}</span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
              <span className="block text-[9px] text-slate-400 uppercase">0-100 km/h</span>
              <span className="text-[#E2F163] font-bold">{car.specs.acceleration}</span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
              <span className="block text-[9px] text-slate-400 uppercase">Output</span>
              <span className="text-white font-bold">{car.specs.horsepower}</span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
              <span className="block text-[9px] text-slate-400 uppercase">Gearbox</span>
              <span className="text-white font-bold truncate block">{car.specs.transmission}</span>
            </div>
          </div>

        </div>

        {/* Pricing & Reservation Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
          
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Daily Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-xl font-extrabold text-white">
                {formatPrice(car.pricePerDay)}
              </span>
              <span className="text-xs text-slate-400 font-normal">/ 24 hrs</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Full Spec Modal Button */}
            <button
              onClick={() => setSelectedCarForDetail(car)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="View Maintenance & Telemetry"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Quick Reserve CTA */}
            <button
              onClick={() => setSelectedCarForModal(car)}
              disabled={!car.isAvailable}
              className={`px-5 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                car.isAvailable
                  ? 'bg-[#E2F163] text-black hover:bg-[#d4e450] hover:shadow-[0_0_20px_rgba(226,241,99,0.4)]'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/10'
              }`}
            >
              <span>{car.isAvailable ? 'Quick Reserve' : 'Reserved'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
