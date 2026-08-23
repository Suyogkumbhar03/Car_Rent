import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { 
  SlidersHorizontal, 
  Car, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Sparkles,
  Users,
  Search,
  X
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    cars, 
    bookings, 
    handleToggleCarAvailability, 
    handleAddCar, 
    formatPrice, 
    isAdminOpen, 
    setIsAdminOpen 
  } = useRental();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'fleet' | 'addCar'
  const [bookingFilterSearch, setBookingFilterSearch] = useState('');

  // New Car Form State
  const [newCar, setNewCar] = useState({
    title: '',
    brand: '',
    model: '',
    year: 2024,
    category: 'Supercar',
    powertrain: 'V8',
    pricePerDay: 950,
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop'],
    specs: {
      speed: '320 km/h',
      acceleration: '3.1s 0-100',
      range: '500 km',
      transmission: '8-Speed Auto',
      seats: 2,
      horsepower: '650 HP',
      driveType: 'AWD'
    },
    description: 'High performance precision engineered flagship edition.'
  });

  if (!isAdminOpen) return null;

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
  const activeBookingsCount = bookings.length;
  const availableCarsCount = cars.filter(c => c.isAvailable).length;

  const handleCreateCarSubmit = async (e) => {
    e.preventDefault();
    if (!newCar.title || !newCar.brand || !newCar.model) {
      alert('Please complete vehicle Title, Brand, and Model.');
      return;
    }
    await handleAddCar(newCar);
    setActiveTab('fleet');
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(bookingFilterSearch.toLowerCase()) ||
    b.carTitle?.toLowerCase().includes(bookingFilterSearch.toLowerCase()) ||
    b.bookingCode?.toLowerCase().includes(bookingFilterSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div 
        className="glass-panel w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-white/10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2F163] animate-pulse" />
              <span className="font-mono text-xs text-[#E2F163] uppercase tracking-wider font-bold">
                MANAGEMENT PORTAL & CONTROL CENTER
              </span>
            </div>
            <h2 className="font-syne text-2xl font-bold text-white">Car Rental Management System</h2>
          </div>

          <button 
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-[#E2F163] hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase">Total Revenue</span>
            <span className="block text-xl font-bold text-[#E2F163] mt-1">{formatPrice(totalRevenue)}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase">Active Reservations</span>
            <span className="block text-xl font-bold text-white mt-1">{activeBookingsCount}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase">Available Vehicles</span>
            <span className="block text-xl font-bold text-[#E2F163] mt-1">{availableCarsCount} / {cars.length}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase">System Status</span>
            <span className="block text-xs font-bold text-emerald-400 mt-2">● ONLINE & SYNCED</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-white/10 pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'bookings' ? 'bg-[#E2F163] text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Customer Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'fleet' ? 'bg-[#E2F163] text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Fleet Availability ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('addCar')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'addCar' ? 'bg-[#E2F163] text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Vehicle
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 font-mono text-xs">
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search bookings by customer name, reservation code, or car title..."
                value={bookingFilterSearch}
                onChange={(e) => setBookingFilterSearch(e.target.value)}
                className="w-full bg-[#0B0D11] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#E2F163]"
              />
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8 text-slate-400">No reservations found in system.</div>
              ) : (
                filteredBookings.map((b) => (
                  <div key={b.id || b._id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#E2F163] font-bold">{b.bookingCode}</span>
                        <span className="text-slate-400">• {b.carTitle}</span>
                      </div>
                      <p className="text-white font-bold">{b.customerName} ({b.email} | {b.phone})</p>
                      <p className="text-slate-400 text-[11px]">Timeline: {b.startDate} to {b.endDate} ({b.days || 1} Days)</p>
                    </div>

                    <div className="text-right md:whitespace-nowrap space-y-1">
                      <span className="text-lg font-bold text-[#E2F163] block">{formatPrice(b.totalPrice)}</span>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                        CONFIRMED
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: FLEET AVAILABILITY MANAGEMENT */}
        {activeTab === 'fleet' && (
          <div className="space-y-3 font-mono text-xs max-h-[50vh] overflow-y-auto pr-1">
            {cars.map((c) => (
              <div key={c.id || c._id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={c.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg border border-white/10" />
                  <div>
                    <h4 className="text-white font-bold font-syne text-sm">{c.title}</h4>
                    <p className="text-slate-400 text-[11px]">{c.category} • {c.powertrain} • {formatPrice(c.pricePerDay)}/day</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold ${c.isAvailable ? 'text-[#E2F163]' : 'text-red-400'}`}>
                    {c.isAvailable ? 'AVAILABLE' : 'RESERVED'}
                  </span>
                  <button
                    onClick={() => handleToggleCarAvailability(c.id || c._id, c.isAvailable)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#E2F163] hover:text-black transition-colors font-bold text-[11px]"
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ADD NEW VEHICLE FORM */}
        {activeTab === 'addCar' && (
          <form onSubmit={handleCreateCarSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Vehicle Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Porsche Taycan Turbo GT"
                  value={newCar.title}
                  onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Brand *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Porsche"
                  value={newCar.brand}
                  onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Model *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Taycan Turbo"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select 
                  value={newCar.category}
                  onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Supercar">Supercar</option>
                  <option value="Executive">Executive</option>
                  <option value="Track">Track</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Powertrain</label>
                <select 
                  value={newCar.powertrain}
                  onChange={(e) => setNewCar({ ...newCar, powertrain: e.target.value })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="EV">EV</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="V8">V8</option>
                  <option value="Twin-Turbo">Twin-Turbo</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Price Per Day ($ USD)</label>
                <input 
                  type="number" 
                  value={newCar.pricePerDay}
                  onChange={(e) => setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Image Unsplash URL</label>
                <input 
                  type="text" 
                  value={newCar.images[0]}
                  onChange={(e) => setNewCar({ ...newCar, images: [e.target.value] })}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-syne font-bold text-xs uppercase"
            >
              Add Vehicle To Fleet
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
