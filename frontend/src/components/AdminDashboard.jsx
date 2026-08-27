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
    setIsAdminOpen,
    user,
    isAdmin,
    setIsAuthModalOpen,
    loadBookingsData
  } = useRental();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'fleet' | 'addCar'
  const [bookingFilterSearch, setBookingFilterSearch] = useState('');

  // Fetch latest bookings whenever admin panel is opened
  React.useEffect(() => {
    if (isAdminOpen) {
      loadBookingsData();
    }
  }, [isAdminOpen]);

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

  // Render Admin Auth Guard if not logged in as Admin
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
        <div 
          className="glass-panel w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl relative text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-syne text-xl font-bold text-slate-900">Admin Authentication Required</h3>
            <p className="text-slate-600 text-xs font-sans">
              To view customer booking records, manage live fleet availability, or create new vehicles, please log in with system administrator privileges.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left space-y-1 font-mono text-[11px]">
            <span className="text-slate-500 font-bold uppercase block">Default Admin Credentials:</span>
            <p className="text-slate-800"><strong className="text-amber-700">Email:</strong> admin@veloce.in</p>
            <p className="text-slate-800"><strong className="text-amber-700">Password:</strong> admin123</p>
          </div>

          <button
            onClick={() => {
              setIsAdminOpen(false);
              setIsAuthModalOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
          >
            Open Admin Login Portal
          </button>
        </div>
      </div>
    );
  }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div 
        className="glass-panel w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-slate-200 bg-white text-slate-900 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-700 uppercase tracking-wider font-bold">
                MANAGEMENT PORTAL & CONTROL CENTER
              </span>
            </div>
            <h2 className="font-syne text-2xl font-bold text-slate-900">Car Rental Management System</h2>
          </div>

          <button 
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Revenue</span>
            <span className="block text-xl font-bold text-amber-700 mt-1">{formatPrice(totalRevenue)}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Active Reservations</span>
            <span className="block text-xl font-bold text-slate-900 mt-1">{activeBookingsCount}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Available Vehicles</span>
            <span className="block text-xl font-bold text-amber-700 mt-1">{availableCarsCount} / {cars.length}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">System Status</span>
            <span className="block text-xs font-bold text-emerald-700 mt-2">● ONLINE & SYNCED</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'bookings' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Customer Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'fleet' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Fleet Availability ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('addCar')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'addCar' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No reservations found in system.</div>
              ) : (
                filteredBookings.map((b) => (
                  <div key={b.id || b._id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-700 font-bold">{b.bookingCode}</span>
                        <span className="text-slate-500">• {b.carTitle}</span>
                      </div>
                      <p className="text-slate-900 font-bold">{b.customerName} ({b.email} | {b.phone})</p>
                      <p className="text-slate-500 text-[11px]">Timeline: {b.startDate} to {b.endDate} ({b.days || 1} Days)</p>
                    </div>

                    <div className="text-right md:whitespace-nowrap space-y-1">
                      <span className="text-lg font-bold text-amber-700 block">{formatPrice(b.totalPrice)}</span>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
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
              <div key={c.id || c._id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={c.images[0]} alt="" className="w-16 h-12 object-cover rounded-lg border border-slate-200" />
                  <div>
                    <h4 className="text-slate-900 font-bold font-syne text-sm">{c.title}</h4>
                    <p className="text-slate-500 text-[11px]">{c.category} • {c.powertrain} • {formatPrice(c.pricePerDay)}/day</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold ${c.isAvailable ? 'text-amber-700' : 'text-red-600'}`}>
                    {c.isAvailable ? 'AVAILABLE' : 'RESERVED'}
                  </span>
                  <button
                    onClick={() => handleToggleCarAvailability(c.id || c._id, c.isAvailable)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 hover:bg-amber-600 hover:text-white transition-colors font-bold text-[11px] cursor-pointer"
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
                <label className="text-slate-600 block mb-1 font-semibold">Vehicle Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mahindra Thar RWD"
                  value={newCar.title}
                  onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-semibold">Brand *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mahindra"
                  value={newCar.brand}
                  onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-semibold">Model *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Thar"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-600 block mb-1 font-semibold">Category</label>
                <select 
                  value={newCar.category}
                  onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="SUV">SUV</option>
                  <option value="Executive">Executive</option>
                  <option value="Supercar">Supercar</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-semibold">Powertrain</label>
                <select 
                  value={newCar.powertrain}
                  onChange={(e) => setNewCar({ ...newCar, powertrain: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="EV">EV</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-semibold">Price Per Day (Base / ₹ INR)</label>
                <input 
                  type="number" 
                  value={newCar.pricePerDay}
                  onChange={(e) => setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-semibold">Image Unsplash URL</label>
                <input 
                  type="text" 
                  value={newCar.images[0]}
                  onChange={(e) => setNewCar({ ...newCar, images: [e.target.value] })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
            >
              Add Vehicle To Fleet
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
