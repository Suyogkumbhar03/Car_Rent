import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, ShoppingBag, Calendar, CheckCircle2, Printer, Car, ArrowRight } from 'lucide-react';

export const BookingDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, bookings, formatPrice } = useRental();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md glass-panel border-l border-white/10 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E2F163]" />
              <h2 className="font-syne text-xl font-bold text-white">Active Reservations</h2>
            </div>

            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-[#E2F163] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Bookings */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {bookings.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Car className="w-12 h-12 text-slate-600 mx-auto stroke-[1.5]" />
                <p className="font-syne text-base text-white font-bold">No Active Reservations Yet</p>
                <p className="text-slate-400 text-xs font-sans max-w-xs mx-auto">
                  Select a vehicle from our performance fleet catalog to create your first reservation.
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div 
                  key={booking.id || booking._id}
                  className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs relative group hover:border-[#E2F163]/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-[#E2F163] font-bold block">
                        CODE: {booking.bookingCode}
                      </span>
                      <h4 className="font-syne text-sm font-bold text-white">{booking.carTitle}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300 text-[11px] border-t border-white/10 pt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Driver:</span>
                      <span className="text-white font-bold">{booking.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timeline:</span>
                      <span className="text-white">{booking.startDate} to {booking.endDate}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Total Charged:</span>
                      <span className="text-[#E2F163] font-bold">{formatPrice(booking.totalPrice)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Dispatch Pass</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-3 rounded-xl bg-[#E2F163] text-black font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#d4e450]"
            >
              Continue Browsing Fleet
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
