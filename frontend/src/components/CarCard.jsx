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
  CheckCircle2,
  Scale
} from 'lucide-react';

export const CarCard = ({ car, viewMode = 'grid' }) => {
  const { 
    formatPrice, 
    setSelectedCarForModal, 
    setSelectedCarForDetail,
    comparedCarIds,
    toggleCompareCar,
    isAdmin,
    setIsAdminOpen
  } = useRental();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const carId = car.id || car._id;
  const isCompared = comparedCarIds.includes(carId);

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
      className={`glass-panel rounded-3xl overflow-hidden group transition-all duration-300 border-slate-200 hover:border-amber-400/70 hover:shadow-xl flex flex-col justify-between ${
        viewMode === 'list' ? 'md:flex-row' : ''
      }`}
    >
      
      {/* Top Image Container */}
      <div className={`relative overflow-hidden bg-slate-100 ${viewMode === 'list' ? 'md:w-5/12 h-64 md:h-auto' : 'h-64'}`}>
        
        {/* Main Image */}
        <img 
          src={car.images[activeImageIndex] || car.images[0]} 
          alt={car.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Controls: Availability + Compare Checkbox */}
        <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between">
          
          <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border flex items-center gap-1.5 backdrop-blur-md ${
            car.isAvailable 
              ? 'bg-emerald-500/20 border-emerald-600/50 text-emerald-800 bg-white/80' 
              : 'bg-red-500/20 border-red-500/50 text-red-700 bg-white/80'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-emerald-600 animate-pulse' : 'bg-red-500'}`} />
            {car.availabilityNotice || (car.isAvailable ? 'Available' : 'Booked')}
          </span>

          {/* Compare Checkbox Trigger */}
          <button
            onClick={() => toggleCompareCar(carId)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md flex items-center gap-1.5 transition-all ${
              isCompared 
                ? 'bg-amber-600 text-white border-amber-600 font-bold shadow-sm'
                : 'bg-white/80 text-slate-800 border-slate-200 hover:border-amber-400'
            }`}
          >
            <Scale className="w-3 h-3 text-amber-600" />
            <span>{isCompared ? 'Added' : 'Compare'}</span>
          </button>
        </div>

        {/* Carousel Controls */}
        {car.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button 
              onClick={prevImage}
              className="w-8 h-8 rounded-full bg-white/80 text-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="w-8 h-8 rounded-full bg-white/80 text-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors shadow-md"
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
                  activeImageIndex === idx ? 'w-5 bg-amber-500' : 'w-1.5 bg-white/60'
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
              <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase block">
                {car.brand} • {car.year} • {car.powertrain}
              </span>
              <h3 className="font-syne text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {car.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-slate-900 font-bold">{car.rating}</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-sans">
            {car.description}
          </p>

          {/* Spec Strip */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono">
            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200/60">
              <span className="block text-[9px] text-slate-500 uppercase">Max Speed</span>
              <span className="text-slate-900 font-bold">{car.specs.speed}</span>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200/60">
              <span className="block text-[9px] text-slate-500 uppercase">0-100 km/h</span>
              <span className="text-amber-700 font-bold">{car.specs.acceleration}</span>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200/60">
              <span className="block text-[9px] text-slate-500 uppercase">Engine</span>
              <span className="text-slate-900 font-bold">{car.specs.horsepower}</span>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200/60">
              <span className="block text-[9px] text-slate-500 uppercase">Gear</span>
              <span className="text-slate-900 font-bold truncate block">{car.specs.transmission}</span>
            </div>
          </div>

        </div>

        {/* Pricing & Reservation Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Per Day Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-xl font-extrabold text-amber-600">
                {formatPrice(car.pricePerDay)}
              </span>
              <span className="text-xs text-slate-500 font-normal">/ day</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Full Spec Modal Button */}
            <button
              onClick={() => setSelectedCarForDetail(car)}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              title="View Car Details"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* For Customers: Show Book Now. For Admins: No booking button on card */}
            {!isAdmin && (
              <button
                onClick={() => setSelectedCarForModal(car)}
                disabled={!car.isAvailable}
                className={`px-5 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  car.isAvailable
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <span>{car.isAvailable ? 'Book Now' : 'Booked'}</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

