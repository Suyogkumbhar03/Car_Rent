import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, CheckCircle2, ShieldCheck, Gauge, Wrench, Sparkles, MapPin, Zap } from 'lucide-react';

export const CarDetailModal = () => {
  const { selectedCarForDetail, setSelectedCarForDetail, setSelectedCarForModal, formatPrice } = useRental();

  if (!selectedCarForDetail) return null;

  const car = selectedCarForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-white/10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={() => setSelectedCarForDetail(null)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-[#E2F163] hover:text-black transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Brand */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E2F163] text-black font-mono text-[10px] font-bold uppercase">
              {car.category} • {car.powertrain}
            </span>
            <span className="text-xs font-mono text-slate-400">VIN VERIFIED: CH-89240</span>
          </div>
          <h2 className="font-syne text-3xl font-bold text-white">{car.title}</h2>
          <p className="text-slate-400 text-xs font-mono">{car.brand} • Model Year {car.year} • Location: {car.location}</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {car.images.map((img, idx) => (
            <div key={idx} className="h-44 rounded-2xl overflow-hidden border border-white/10">
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          ))}
        </div>

        {/* Description & Performance Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/10">
          
          <div className="md:col-span-7 space-y-4">
            <h3 className="font-syne text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E2F163]" />
              Engineering Overview
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              {car.description}
            </p>

            {/* Maintenance History */}
            <div className="pt-3 space-y-2">
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#E2F163]" />
                Certified Telemetry & Maintenance Audit
              </h4>
              <div className="space-y-2">
                {car.maintenanceHistory && car.maintenanceHistory.map((m, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 text-xs font-mono">
                    <div>
                      <span className="text-white font-bold block">{m.type}</span>
                      <span className="text-slate-500 text-[10px]">Logged at {m.mileage} • {m.date}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-syne text-base font-bold text-white mb-3">Technical Specification Strip</h3>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">0-100 km/h:</span>
                  <span className="text-[#E2F163] font-bold">{car.specs.acceleration}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Top Speed:</span>
                  <span className="text-white font-bold">{car.specs.speed}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Max Horsepower:</span>
                  <span className="text-white font-bold">{car.specs.horsepower}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Drivetrain:</span>
                  <span className="text-white font-bold">{car.specs.driveType}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Range Capacity:</span>
                  <span className="text-white font-bold">{car.specs.range}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seating Capacity:</span>
                  <span className="text-white font-bold">{car.specs.seats} Persons</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-slate-400">Daily Rate:</span>
                <span className="font-mono text-2xl font-bold text-[#E2F163]">
                  {formatPrice(car.pricePerDay)}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedCarForDetail(null);
                  setSelectedCarForModal(car);
                }}
                disabled={!car.isAvailable}
                className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#d4e450] transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
