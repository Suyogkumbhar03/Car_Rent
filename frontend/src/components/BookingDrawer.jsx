import React from 'react';
import { useRental } from '../context/RentalContext';
import { X, ShoppingBag, Calendar, CheckCircle2, Printer, Car, ArrowRight } from 'lucide-react';

export const BookingDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, bookings, formatPrice } = useRental();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md glass-panel bg-white border-l border-slate-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="font-syne text-xl font-bold text-slate-900">Active Reservations</h2>
            </div>

            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Bookings */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {bookings.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Car className="w-12 h-12 text-slate-400 mx-auto stroke-[1.5]" />
                <p className="font-syne text-base text-slate-900 font-bold">No Active Reservations Yet</p>
                <p className="text-slate-600 text-xs font-sans max-w-xs mx-auto">
                  Select a vehicle from our fleet catalog to create your first reservation.
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div 
                  key={booking.id || booking._id}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs relative group hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-amber-700 font-bold block">
                        CODE: {booking.bookingCode}
                      </span>
                      <h4 className="font-syne text-sm font-bold text-slate-900">{booking.carTitle}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold border border-emerald-200">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-700 text-[11px] border-t border-slate-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer:</span>
                      <span className="text-slate-900 font-bold">{booking.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Timeline:</span>
                      <span className="text-slate-900">{booking.startDate} to {booking.endDate}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Total Charged:</span>
                      <span className="text-amber-700 font-bold">{formatPrice(booking.totalPrice)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Reservation Pass</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors cursor-pointer shadow-sm"
            >
              Continue Browsing Fleet
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
