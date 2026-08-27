import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, CheckCircle2, ShieldCheck, Gauge, Wrench, Sparkles, MapPin, Zap } from 'lucide-react';

export const CarDetailModal = () => {
  const { selectedCarForDetail, setSelectedCarForDetail, setSelectedCarForModal, formatPrice, isAdmin } = useRental();

  if (!selectedCarForDetail) return null;

  const car = selectedCarForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div 
        className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-slate-200 bg-white text-slate-900 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={() => setSelectedCarForDetail(null)}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Brand */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px] font-bold uppercase">
              {car.category} • {car.powertrain}
            </span>
            <span className="text-xs font-mono text-slate-500">VERIFIED VEHICLE</span>
          </div>
          <h2 className="font-syne text-3xl font-bold text-slate-900">{car.title}</h2>
          <p className="text-slate-500 text-xs font-mono">{car.brand} • Model Year {car.year} • Location: {car.location}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {car.images.map((img, idx) => (
            <div key={idx} className="h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          ))}
        </div>

        {/* Description & Performance Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-200">
          
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-syne text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Car Overview
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              {car.description}
            </p>

            {/* Maintenance History */}
            <div className="pt-3 space-y-2">
              <h4 className="font-mono text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                Service & Safety Checks
              </h4>
              <div className="space-y-2">
                {car.maintenanceHistory && car.maintenanceHistory.map((m, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                    <div>
                      <span className="text-slate-900 font-bold block">{m.type}</span>
                      <span className="text-slate-500 text-[10px]">At {m.mileage} • {m.date}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-syne text-base font-bold text-slate-900 mb-3">Car Specifications</h3>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">0 to 100 km/h:</span>
                  <span className="text-amber-700 font-bold">{car.specs.acceleration}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Max Speed:</span>
                  <span className="text-slate-900 font-bold">{car.specs.speed}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Engine Power:</span>
                  <span className="text-slate-900 font-bold">{car.specs.horsepower}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Drive Type:</span>
                  <span className="text-slate-900 font-bold">{car.specs.driveType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Fuel / Range:</span>
                  <span className="text-slate-900 font-bold">{car.specs.range}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Seats:</span>
                  <span className="text-slate-900 font-bold">{car.specs.seats} Seats</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-slate-500">Price Per Day:</span>
                <span className="font-mono text-2xl font-bold text-amber-600">
                  {formatPrice(car.pricePerDay)}
                </span>
              </div>

              {!isAdmin && (
                <button
                  onClick={() => {
                    setSelectedCarForDetail(null);
                    setSelectedCarForModal(car);
                  }}
                  disabled={!car.isAvailable}
                  className="w-full py-3 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors cursor-pointer shadow-sm"
                >
                  Book This Car
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
