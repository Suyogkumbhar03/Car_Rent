import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, Scale, Zap, ArrowRight, Trash2, CheckCircle2, Shield } from 'lucide-react';

export const CompareDrawer = () => {
  const { 
    isCompareOpen, 
    setIsCompareOpen, 
    comparedCarIds, 
    clearComparison, 
    toggleCompareCar,
    cars, 
    formatPrice,
    setSelectedCarForModal,
    isAdmin
  } = useRental();

  if (!isCompareOpen) return null;

  const comparedCars = cars.filter(c => comparedCarIds.includes(c.id || c._id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-4xl glass-panel bg-white border-l border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-syne text-xl font-bold text-slate-900">Compare Specifications</h2>
                <p className="text-slate-500 text-xs font-mono">Comparing {comparedCars.length} of 3 selected vehicles</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {comparedCars.length > 0 && (
                <button
                  onClick={clearComparison}
                  className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-600 hover:text-red-600 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}

              <button 
                onClick={() => setIsCompareOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Comparison Content */}
          {comparedCars.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                <Scale className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-syne text-lg text-slate-900 font-bold">No Vehicles Selected for Comparison</h3>
              <p className="text-slate-600 text-xs font-sans max-w-sm mx-auto">
                Click the <span className="text-amber-700 font-mono font-bold">"Compare"</span> checkbox on any vehicle card in the catalog to evaluate performance metrics side-by-side.
              </p>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="px-6 py-2.5 rounded-full bg-amber-600 text-white font-syne font-bold text-xs uppercase cursor-pointer hover:bg-amber-700 transition-colors shadow-sm"
              >
                Browse Fleet Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Top Vehicles Spec Matrix Header */}
              <div className={`grid gap-4 ${
                comparedCars.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                comparedCars.length === 2 ? 'grid-cols-2' :
                'grid-cols-3'
              }`}>
                {comparedCars.map((car) => (
                  <div key={car.id || car._id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 relative group">
                    <button
                      onClick={() => toggleCompareCar(car.id || car._id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors z-10 cursor-pointer"
                      title="Remove from compare"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-32 rounded-xl overflow-hidden relative">
                      <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[9px] font-mono font-bold text-amber-700 uppercase border border-slate-200">
                        {car.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">{car.brand}</span>
                      <h4 className="font-syne text-sm font-bold text-slate-900 truncate">{car.title}</h4>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="font-mono text-base font-extrabold text-amber-700">
                        {formatPrice(car.pricePerDay)}
                        <span className="text-[10px] text-slate-500 font-normal">/day</span>
                      </span>

                      {!isAdmin && (
                        <button
                          onClick={() => {
                            setIsCompareOpen(false);
                            setSelectedCarForModal(car);
                          }}
                          className="px-3 py-1.5 rounded-full bg-amber-600 text-white font-syne font-bold text-[10px] uppercase hover:bg-amber-700 transition-colors cursor-pointer"
                        >
                          Reserve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Metrics Grid */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 font-mono text-xs">
                
                <h4 className="font-syne text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                  Technical Benchmark Matrix
                </h4>

                {/* Metric 1: 0-100 km/h */}
                <div className="space-y-1.5 border-b border-slate-200 pb-3">
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Acceleration (0-100 km/h)</span>
                  <div className={`grid gap-4 ${
                    comparedCars.length === 1 ? 'grid-cols-1' :
                    comparedCars.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {comparedCars.map((c) => (
                      <div key={c.id || c._id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <span className="text-amber-700 font-bold text-sm">{c.specs.acceleration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric 2: Top Speed */}
                <div className="space-y-1.5 border-b border-slate-200 pb-3">
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Top Speed</span>
                  <div className={`grid gap-4 ${
                    comparedCars.length === 1 ? 'grid-cols-1' :
                    comparedCars.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {comparedCars.map((c) => (
                      <div key={c.id || c._id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <span className="text-slate-900 font-bold text-sm">{c.specs.speed}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric 3: Output Power */}
                <div className="space-y-1.5 border-b border-slate-200 pb-3">
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Engine Power</span>
                  <div className={`grid gap-4 ${
                    comparedCars.length === 1 ? 'grid-cols-1' :
                    comparedCars.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {comparedCars.map((c) => (
                      <div key={c.id || c._id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <span className="text-slate-900 font-bold text-sm">{c.specs.horsepower}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric 4: Powertrain Engine */}
                <div className="space-y-1.5 border-b border-slate-200 pb-3">
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Powertrain System</span>
                  <div className={`grid gap-4 ${
                    comparedCars.length === 1 ? 'grid-cols-1' :
                    comparedCars.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {comparedCars.map((c) => (
                      <div key={c.id || c._id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <span className="text-slate-800 text-xs font-bold">{c.powertrain}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric 5: Transmission */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Gearbox & Drivetrain</span>
                  <div className={`grid gap-4 ${
                    comparedCars.length === 1 ? 'grid-cols-1' :
                    comparedCars.length === 2 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {comparedCars.map((c) => (
                      <div key={c.id || c._id} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                        <span className="text-slate-900 text-xs block font-bold">{c.specs.transmission}</span>
                        <span className="text-[10px] text-slate-500">{c.specs.driveType}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsCompareOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-syne font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Comparison Window
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
