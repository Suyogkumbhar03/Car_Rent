import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { CarCard } from './CarCard';
import { Search, LayoutGrid, List, SlidersHorizontal, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const FleetCatalog = () => {
  const { cars, filters, setFilters, loading, formatPrice } = useRental();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'EV', 'Luxury'];
  const powertrains = ['All', 'Diesel', 'Petrol', 'Electric'];

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      powertrain: 'All',
      maxPrice: 25000,
      availableOnly: false
    });
  };

  return (
    <section id="fleet" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Available <span className="text-amber-600">Rental Fleet</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans mt-2 max-w-xl">
            Choose from our fleet of SUVs, Sedans, Hatchbacks, EVs, and Luxury vehicles with daily rates in ₹ INR.
          </p>
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-500">
            SHOWING <strong className="text-amber-700">{cars.length}</strong> CARS
          </span>

          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Faceted Filter Control Bar */}
      <div className="glass-panel rounded-3xl p-5 border-slate-200 space-y-5 shadow-md">
        
        {/* Top Search & Price Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Live Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search car model or brand (e.g., Thar, Fortuner, Creta, BMW)..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-4 flex items-center gap-3">
            <label className="text-[10px] font-mono text-slate-600 uppercase tracking-wider whitespace-nowrap font-medium">
              Max Daily: <strong className="text-amber-700">{formatPrice(filters.maxPrice)}</strong>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="25000" 
              step="500"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Available Only Checkbox */}
          <div className="md:col-span-2 flex items-center justify-end">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-700 font-medium">
              <input 
                type="checkbox"
                checked={filters.availableOnly}
                onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
                className="accent-amber-600 w-4 h-4 rounded cursor-pointer"
              />
              <span>Available Only</span>
            </label>
          </div>

        </div>

        {/* Category & Powertrain Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/80">
          
          {/* Class Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-mono text-slate-500 uppercase mr-1 font-semibold">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border whitespace-nowrap ${
                  filters.category === cat 
                    ? 'bg-amber-600 text-white border-amber-600 font-bold shadow-sm'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Powertrain Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-mono text-slate-500 uppercase mr-1 font-semibold">Engine:</span>
            {powertrains.map((pt) => (
              <button
                key={pt}
                onClick={() => setFilters({ ...filters, powertrain: pt })}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all border whitespace-nowrap ${
                  filters.powertrain === pt 
                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-amber-700 transition-colors ml-auto cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

        </div>

      </div>

      {/* Grid or List Display */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs text-slate-500">Loading vehicle specs...</p>
        </div>
      ) : cars.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border-slate-200 shadow-md">
          <p className="font-syne text-xl text-slate-900 font-bold">No vehicles match your active criteria.</p>
          <p className="text-slate-600 text-xs max-w-md mx-auto">
            Try adjusting your search query, price ceiling, or category filter to discover available models.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-full bg-amber-600 text-white font-syne font-bold text-xs uppercase hover:bg-amber-700 transition-all shadow-sm"
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
