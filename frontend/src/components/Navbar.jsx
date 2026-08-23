import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { ShieldCheck, ShoppingBag, SlidersHorizontal, Globe, Car, Sparkles, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { 
    currency, 
    setCurrency, 
    currencyRates, 
    bookings, 
    setIsDrawerOpen, 
    isAdminOpen, 
    setIsAdminOpen 
  } = useRental();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-8 max-w-7xl mx-auto">
      <nav className="glass-panel rounded-full px-5 py-3 flex items-center justify-between shadow-2xl transition-all duration-300 border-white/10">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#E2F163] text-black flex items-center justify-center font-bold tracking-tighter group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(226,241,99,0.4)]">
            <Car className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-[#E2F163] transition-colors">
              VELOCE
            </span>
            <span className="block text-[9px] font-mono text-slate-400 tracking-widest uppercase -mt-0.5">
              Editorial Fleet
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-slate-300">
          <a href="#hero" className="hover:text-[#E2F163] transition-colors py-1">Overview</a>
          <a href="#fleet" className="hover:text-[#E2F163] transition-colors py-1 flex items-center gap-1.5">
            Fleet Catalog
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2F163] animate-pulse"></span>
          </a>
          <a href="#experiences" className="hover:text-[#E2F163] transition-colors py-1">Concierge</a>
          
          <button 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all border ${
              isAdminOpen 
                ? 'bg-[#E2F163] text-black border-[#E2F163] font-bold' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {isAdminOpen ? 'Close Portal' : 'Admin Portal'}
          </button>
        </div>

        {/* Actions (Currency + Cart Drawer) */}
        <div className="flex items-center gap-3">
          
          {/* Currency Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-white/20 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#E2F163]" />
              <span>{currency}</span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 glass-panel rounded-xl py-2 shadow-2xl border-white/10 z-50 animate-in fade-in slide-in-from-top-2">
                {Object.keys(currencyRates).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-1.5 text-xs font-mono transition-colors flex items-center justify-between ${
                      currency === curr ? 'text-[#E2F163] font-bold bg-white/5' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{curr}</span>
                    <span className="text-[10px] text-slate-400">{currencyRates[curr].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Drawer Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2F163] text-black font-semibold text-xs tracking-wide hover:bg-[#d4e450] hover:shadow-[0_0_20px_rgba(226,241,99,0.3)] transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Reservations</span>
            {bookings.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-[#E2F163] text-[10px] font-mono flex items-center justify-center font-bold">
                {bookings.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-5 space-y-4 border-white/10 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-200"
            >
              Overview
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-[#E2F163] font-bold"
            >
              Fleet Catalog
            </a>
            <a 
              href="#experiences" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-slate-200"
            >
              Concierge Services
            </a>
            <button 
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg bg-[#E2F163]/10 border border-[#E2F163]/30 text-[#E2F163] font-bold"
            >
              {isAdminOpen ? 'Exit Management Portal' : 'Open Admin Portal'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
