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
    <div className="w-full glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl border-white/10 relative z-20 glow-amber">
      
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E2F163] animate-pulse" />
          <span className="font-mono text-xs text-white tracking-wide font-medium">
            Quick Fleet Dispatch
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          Instant Telemetry & Reservation Lock
        </span>
      </div>

      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Pick-Up Location */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E2F163]" />
            Pick-Up Hub
          </label>
          <select 
            value={quickSearchState.location}
            onChange={(e) => setQuickSearchState({ ...quickSearchState, location: e.target.value })}
            className="w-full bg-[#0B0D11]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-[#E2F163] transition-colors"
          >
            <option value="Zurich Airport Terminal 1">Zurich Airport (Terminal 1)</option>
            <option value="Geneva Executive Terminal">Geneva Executive Hub</option>
            <option value="St. Moritz Alpine Lodge">St. Moritz Alpine Lodge</option>
            <option value="Custom Private Concierge Delivery">Private Delivery (Hotel/Track)</option>
          </select>
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E2F163]" />
              Start Date
            </label>
            <input 
              type="date" 
              value={quickSearchState.startDate}
              onChange={(e) => setQuickSearchState({ ...quickSearchState, startDate: e.target.value })}
              className="w-full bg-[#0B0D11]/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E2F163] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#E2F163]" />
              End Date
            </label>
            <input 
              type="date" 
              value={quickSearchState.endDate}
              onChange={(e) => setQuickSearchState({ ...quickSearchState, endDate: e.target.value })}
              className="w-full bg-[#0B0D11]/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E2F163] transition-colors"
            />
          </div>
        </div>

        {/* Vehicle Category */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Car className="w-3 h-3 text-[#E2F163]" />
            Vehicle Class
          </label>
          <select 
            value={quickSearchState.category}
            onChange={(e) => setQuickSearchState({ ...quickSearchState, category: e.target.value })}
            className="w-full bg-[#0B0D11]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-[#E2F163] transition-colors"
          >
            <option value="All">All Vehicle Classes</option>
            <option value="Supercar">Supercar (V12 / Hybrid)</option>
            <option value="Track">Track Specialist</option>
            <option value="Executive">Executive EV & Saloon</option>
            <option value="SUV">Luxury Off-Road SUV</option>
          </select>
        </div>

        {/* Dispatch Action Button */}
        <div>
          <button 
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[#E2F163] text-black font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#d4e450] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(226,241,99,0.3)]"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search Available Fleet</span>
          </button>
        </div>

      </form>

    </div>
  );
};
