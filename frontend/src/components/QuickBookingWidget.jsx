import React from 'react';
import { useRental } from '../context/RentalContext';
import { MapPin, Calendar, Car, Search, ArrowRight } from 'lucide-react';

export const QuickBookingWidget = () => {
  const { 
    quickSearchState, 
    setQuickSearchState, 
    filters, 
    setFilters,
    showToast 
  } = useRental();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      category: quickSearchState.category,
      availableOnly: true
    }));
    
    showToast(`Filtering available ${quickSearchState.category === 'All' ? 'vehicles' : quickSearchState.category + 's'} for ${quickSearchState.location}...`, 'info');

    const fleetEl = document.getElementById('fleet');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-4 sm:p-6 shadow-md border-slate-200 relative z-20">
      
      <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-xs text-slate-900 tracking-wide font-bold uppercase">
            Quick Reservation
          </span>
        </div>
        <span className="text-[11px] font-mono text-amber-700 font-semibold hidden sm:inline">
          Doorstep Delivery & Airport Pickup Available
        </span>
      </div>

      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Pick-Up Location */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1 font-semibold">
            <MapPin className="w-3 h-3 text-amber-600" />
            Pickup City
          </label>
          <select 
            value={quickSearchState.location}
            onChange={(e) => setQuickSearchState({ ...quickSearchState, location: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-sans text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
          >
            <option value="Mumbai">Mumbai (Airport / Central)</option>
            <option value="Pune">Pune (City / Airport)</option>
            <option value="Goa">Goa (Mopa / Dabolim Airport)</option>
            <option value="Bangalore">Bangalore (Airport / City)</option>
            <option value="Delhi NCR">Delhi NCR (Airport T3 / Gurgaon)</option>
            <option value="Hyderabad">Hyderabad (Shamshabad / City)</option>
          </select>
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1 font-semibold">
              <Calendar className="w-3 h-3 text-amber-600" />
              Start Date
            </label>
            <input 
              type="date" 
              value={quickSearchState.startDate}
              onChange={(e) => setQuickSearchState({ ...quickSearchState, startDate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1 font-semibold">
              <Calendar className="w-3 h-3 text-amber-600" />
              End Date
            </label>
            <input 
              type="date" 
              value={quickSearchState.endDate}
              onChange={(e) => setQuickSearchState({ ...quickSearchState, endDate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Vehicle Category */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1 font-semibold">
            <Car className="w-3 h-3 text-amber-600" />
            Car Category
          </label>
          <select 
            value={quickSearchState.category}
            onChange={(e) => setQuickSearchState({ ...quickSearchState, category: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-sans text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="SUV">SUV & 4x4 Off-Road</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="EV">Electric Vehicle (EV)</option>
            <option value="Luxury">Luxury Sedan & SUV</option>
          </select>
        </div>

        {/* Search Action Button */}
        <div>
          <button 
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search Cars</span>
          </button>
        </div>

      </form>

    </div>
  );
};
