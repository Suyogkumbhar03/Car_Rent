import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { ShieldCheck, ShoppingBag, SlidersHorizontal, Globe, Car, Sparkles, Menu, X, Scale, User as UserIcon, LogOut, KeyRound } from 'lucide-react';

export const Navbar = () => {
  const { 
    currency, 
    setCurrency, 
    currencyRates, 
    bookings, 
    setIsDrawerOpen, 
    isCompareOpen,
    setIsCompareOpen,
    comparedCarIds,
    isAdminOpen, 
    setIsAdminOpen,
    user,
    isAdmin,
    setIsAuthModalOpen,
    logout
  } = useRental();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdminOpen(!isAdminOpen);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-8 max-w-7xl mx-auto">
      <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-lg transition-all duration-300 border-slate-200/80">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform shadow-md">
            <Car className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              VELOCE
            </span>
            <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider -mt-1">
              CAR RENTALS
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-slate-700">
          <a href="#hero" className="hover:text-amber-600 font-semibold transition-colors py-1">Home</a>
          <a href="#fleet" className="hover:text-amber-600 font-semibold transition-colors py-1 flex items-center gap-1.5">
            Cars
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          </a>
          <a href="#experiences" className="hover:text-amber-600 font-semibold transition-colors py-1">Why Us</a>
          
          <button 
            onClick={handleAdminClick}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono transition-all border cursor-pointer ${
              isAdminOpen 
                ? 'bg-amber-600 text-white border-amber-600 font-bold shadow-sm' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {isAdminOpen ? 'Close Admin' : isAdmin ? 'Admin Portal' : 'Admin Login'}
          </button>
        </div>

        {/* Actions (Auth + Compare + Bookings Drawer) */}
        <div className="flex items-center gap-3">
          
          {/* User Auth Profile / Login Trigger */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-100 p-1 pl-3 rounded-full border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-slate-900 truncate max-w-[100px] sm:max-w-none">{user.name}</span>
                {user.role === 'admin' && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-600 text-white text-[9px] font-bold">ADMIN</span>
                )}
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-full bg-slate-200 hover:bg-red-500 hover:text-white text-slate-600 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-full bg-slate-900 text-white hover:bg-amber-600 transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Compare Drawer Trigger */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className={`relative flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full transition-all border cursor-pointer ${
              comparedCarIds.length > 0
                ? 'bg-amber-50 border-amber-400 text-amber-800 font-bold'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Compare selected cars"
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Compare</span>
            {comparedCarIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[9px] font-bold flex items-center justify-center">
                {comparedCarIds.length}
              </span>
            )}
          </button>

          {/* Action CTA: Admin gets "+ Add Car to Rent", Customer gets "My Bookings" */}
          {isAdmin ? (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 font-syne font-bold text-xs tracking-wide hover:bg-amber-600 hover:text-white transition-all cursor-pointer shadow-sm border border-amber-500/30"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">+ Add Car for Rent</span>
            </button>
          ) : (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600 text-white font-syne font-bold text-xs tracking-wide hover:bg-amber-700 transition-all cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">My Bookings</span>
              {user && bookings.filter(b => b.email && user.email && b.email.toLowerCase() === user.email.toLowerCase()).length > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-mono flex items-center justify-center font-bold">
                  {bookings.filter(b => b.email && user.email && b.email.toLowerCase() === user.email.toLowerCase()).length}
                </span>
              )}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-5 space-y-4 border-slate-200 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800"
            >
              Home
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-amber-700 font-bold"
            >
              Cars
            </a>
            <a 
              href="#experiences" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-800"
            >
              Why Us
            </a>
            <button 
              onClick={() => {
                setIsAdminOpen(!isAdminOpen);
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-bold"
            >
              {isAdminOpen ? 'Close Admin' : 'Admin'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
