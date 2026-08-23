import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { CarCard } from './CarCard';
import { Search, LayoutGrid, List, SlidersHorizontal, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const FleetCatalog = () => {
  const { cars, filters, setFilters, loading } = useRental();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = ['All', 'Supercar', 'Track', 'Executive', 'SUV'];
  const powertrains = ['All', 'EV', 'Hybrid', 'V8', 'Twin-Turbo'];

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      powertrain: 'All',
      maxPrice: 2500,
      availableOnly: false
    });
  };

  return (
    <section id="fleet" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E2F163] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Selection</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Performance <span className="italic font-normal text-[#E2F163]">Catalog</span>
          </h2>
          <p className="text-slate-300/80 text-xs sm:text-sm font-sans mt-2 max-w-xl">
            Explore our curated inventory of track-ready supercars, luxury SUVs, and high-efficiency electric saloons.
          </p>
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-400">
            SHOWING <strong className="text-[#E2F163]">{cars.length}</strong> VEHICLES
          </span>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-[#E2F163] text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-[#E2F163] text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Faceted Filter Control Bar */}
      <div className="glass-panel rounded-3xl p-5 border-white/10 space-y-5">
        
        {/* Top Search & Price Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Live Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by model, make, or specs (e.g., Porsche 911, V12, Ferrari)..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-[#0B0D11]/90 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E2F163] transition-colors"
            />
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-4 flex items-center gap-3">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Max Daily: <strong className="text-white">${filters.maxPrice}</strong>
            </label>
            <input 
              type="range" 
              min="500" 
              max="2500" 
              step="50"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#E2F163] cursor-pointer"
            />
          </div>

          {/* Available Only Checkbox */}
          <div className="md:col-span-2 flex items-center justify-end">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
              <input 
                type="checkbox"
                checked={filters.availableOnly}
                onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
                className="accent-[#E2F163] w-4 h-4 rounded cursor-pointer"
              />
              <span>Available Only</span>
            </label>
          </div>

        </div>

        {/* Category & Powertrain Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
          
          {/* Class Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Class:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all border whitespace-nowrap ${
                  filters.category === cat 
                    ? 'bg-[#E2F163] text-black border-[#E2F163] font-bold shadow-[0_0_10px_rgba(226,241,99,0.3)]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Powertrain Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Powertrain:</span>
            {powertrains.map((pt) => (
              <button
                key={pt}
                onClick={() => setFilters({ ...filters, powertrain: pt })}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all border whitespace-nowrap ${
                  filters.powertrain === pt 
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-[#E2F163] transition-colors ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

        </div>

      </div>

      {/* Grid or List Display */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#E2F163] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs text-slate-400">Loading editorial vehicle specs...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border-white/10">
          <p className="font-syne text-xl text-white font-bold">No vehicles match your active criteria.</p>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Try adjusting your search query, price ceiling, or category filter to discover available models.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-full bg-[#E2F163] text-black font-syne font-bold text-xs uppercase"
          >
            Show All Fleet Vehicles
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }>
          {cars.map((car) => (
            <CarCard key={car.id || car._id} car={car} viewMode={viewMode} />
          ))}
        </div>
      )}

    </section>
  );
};
