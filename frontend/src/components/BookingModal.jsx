import React, { useState, useEffect } from 'react';
import { useRental } from '../context/RentalContext';
import { X, Check, ArrowRight, ArrowLeft, Shield, Upload, Sparkles, CreditCard, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal = () => {
  const { 
    selectedCarForModal, 
    setSelectedCarForModal, 
    formatPrice, 
    handleCreateBooking, 
    quickSearchState,
    currency
  } = useRental();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    driverLicense: 'CH-LIC-9482',
    licenseFilePreview: null,
    startDate: quickSearchState.startDate || '2026-08-25',
    endDate: quickSearchState.endDate || '2026-08-28',
    selectedAddOns: ['Full Coverage Insurance (Track)']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Add-ons list definition
  const addOnsList = [
    { id: 'insurance', name: 'Full Coverage Insurance (Track & Road)', pricePerDay: 120, desc: 'Zero deductible for collision, glass, and carbon aero panels.' },
    { id: 'concierge', name: 'Personal Concierge Delivery & Return', pricePerDay: 80, desc: 'Direct enclosed trailer drop-off to your chalet, hotel, or pit lane.' },
    { id: 'driver', name: 'Additional Certified Driver', pricePerDay: 45, desc: 'Authorize an additional driver for high-speed mountain passes.' },
    { id: 'telemetry', name: 'Race Telemetry & Lap Timer Pack', pricePerDay: 30, desc: 'GPS lap recording, tire pressure sensors, and video export.' }
  ];

  // Reset modal state whenever a new car is selected
  useEffect(() => {
    if (selectedCarForModal) {
      setStep(1);
      setConfirmedBooking(null);
    }
  }, [selectedCarForModal]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('veloce_booking_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    localStorage.setItem('veloce_booking_draft', JSON.stringify({
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      startDate: formData.startDate,
      endDate: formData.endDate,
      selectedAddOns: formData.selectedAddOns
    }));
  }, [formData]);

  if (!selectedCarForModal) return null;

  const car = selectedCarForModal;

  // Days Calculation
  const start = new Date(formData.startDate);
  const end = new Date(formData.endDate);
  const diffTime = Math.max(1000 * 60 * 60 * 24, end - start);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Financial Calculations (USD Base)
  const baseCarTotal = car.pricePerDay * days;
  
  const addOnsTotalPerDay = formData.selectedAddOns.reduce((sum, name) => {
    const found = addOnsList.find(a => a.name === name);
    return sum + (found ? found.pricePerDay : 0);
  }, 0);

  const addOnsTotal = addOnsTotalPerDay * days;
  const subtotal = baseCarTotal + addOnsTotal;
  const taxAmount = subtotal * 0.08;
  const depositAmount = 500;
  const grandTotal = subtotal + taxAmount;

  const toggleAddOn = (name) => {
    setFormData(prev => {
      const exists = prev.selectedAddOns.includes(name);
      return {
        ...prev,
        selectedAddOns: exists 
          ? prev.selectedAddOns.filter(a => a !== name)
          : [...prev.selectedAddOns, name]
      };
    });
  };

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, licenseFilePreview: url, driverLicense: file.name }));
    }
  };

  const handleSubmitBooking = async () => {
    if (!formData.customerName || !formData.email || !formData.phone) {
      alert('Please fill in all driver details before confirming.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await handleCreateBooking({
        carId: car.id || car._id,
        carTitle: car.title,
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        driverLicense: formData.driverLicense,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        totalPrice: grandTotal,
        deposit: depositAmount,
        addOns: formData.selectedAddOns
      });

      setConfirmedBooking(res);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      localStorage.removeItem('veloce_booking_draft');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedCarForModal(null);
    setConfirmedBooking(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in">
      
      <div 
        className="glass-panel w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-white/10 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[10px] text-[#E2F163] uppercase tracking-widest block">
              THREE-STEP EDITORIAL CHECKOUT
            </span>
            <h2 className="font-syne text-2xl font-bold text-white">{car.title}</h2>
          </div>

          <button 
            onClick={handleCloseModal}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-[#E2F163] hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {!confirmedBooking && (
          <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center border-b border-white/10 pb-4">
            <div className={`py-2 rounded-xl transition-all ${step === 1 ? 'bg-[#E2F163] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>
              1. Add-ons & Specs
            </div>
            <div className={`py-2 rounded-xl transition-all ${step === 2 ? 'bg-[#E2F163] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>
              2. Driver & License
            </div>
            <div className={`py-2 rounded-xl transition-all ${step === 3 ? 'bg-[#E2F163] text-black font-bold' : 'bg-white/5 text-slate-400'}`}>
              3. Summary & Pay
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#E2F163] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(226,241,99,0.5)]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#E2F163] uppercase tracking-widest">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-syne text-3xl font-extrabold text-white">
                CODE: {confirmedBooking.bookingCode}
              </h3>
              <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
                Thank you, {confirmedBooking.customerName}. Your {car.title} is locked for dispatch from {confirmedBooking.startDate} to {confirmedBooking.endDate}.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Total Duration:</span>
                <span className="text-white font-bold">{confirmedBooking.days} Days</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Total Charged:</span>
                <span className="text-[#E2F163] font-bold">{formatPrice(confirmedBooking.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Deposit:</span>
                <span className="text-white">{formatPrice(confirmedBooking.deposit)} (Refundable)</span>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="px-8 py-3 rounded-full bg-[#E2F163] text-black font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#d4e450]"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <>
            {/* STEP 1: Add-ons & Timeline selection */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Timeline pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Pick-Up Date</label>
                    <input 
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#E2F163]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Return Date</label>
                    <input 
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#E2F163]"
                    />
                  </div>
                </div>

                {/* Add-ons List */}
                <div className="space-y-3">
                  <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider">
                    Select Luxury Add-ons & Coverage
                  </h4>
                  
                  <div className="space-y-2.5">
                    {addOnsList.map((addon) => {
                      const isSelected = formData.selectedAddOns.includes(addon.name);
                      return (
                        <div 
                          key={addon.id}
                          onClick={() => toggleAddOn(addon.name)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-[#E2F163]/10 border-[#E2F163] text-white' 
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-syne text-sm font-bold text-white">{addon.name}</span>
                            </div>
                            <p className="text-xs text-slate-400">{addon.desc}</p>
                          </div>

                          <div className="text-right font-mono whitespace-nowrap">
                            <span className="text-xs font-bold text-[#E2F163]">
                              +{formatPrice(addon.pricePerDay)}
                            </span>
                            <span className="text-[10px] text-slate-400 block">/day</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1 Footer Action */}
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="px-7 py-3 rounded-full bg-[#E2F163] text-black font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4e450]"
                  >
                    <span>Next: Driver Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: Driver Details & License Upload Preview */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Full Driver Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alexander Vance"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E2F163]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E2F163]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Mobile Phone (Concierge Updates) *</label>
                    <input 
                      type="tel" 
                      placeholder="+41 79 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E2F163]"
                      required
                    />
                  </div>
                </div>

                {/* Driver's License Document Preview */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase block">
                    Driver's License / ID Document Verification
                  </label>
                  
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center bg-white/5 hover:border-[#E2F163]/50 transition-colors relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleLicenseUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    {formData.licenseFilePreview ? (
                      <div className="space-y-2">
                        <img 
                          src={formData.licenseFilePreview} 
                          alt="License Preview" 
                          className="h-28 mx-auto rounded-lg object-cover border border-white/20"
                        />
                        <p className="text-xs font-mono text-[#E2F163] font-bold">Document Uploaded Successfully</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pointer-events-none">
                        <Upload className="w-8 h-8 text-[#E2F163] mx-auto" />
                        <p className="text-xs font-mono text-slate-300 font-bold">Drag & Drop Driver's License Scan or Click to Browse</p>
                        <p className="text-[10px] text-slate-500 font-mono">PNG, JPG, or PDF (Max 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 rounded-full bg-white/5 text-slate-300 font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!formData.customerName || !formData.email || !formData.phone) {
                        alert('Please complete Driver Name, Email, and Phone.');
                        return;
                      }
                      setStep(3);
                    }}
                    className="px-7 py-3 rounded-full bg-[#E2F163] text-black font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4e450]"
                  >
                    <span>Next: Cost Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Timeline & Cost Breakdown */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Itemized Receipt */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
                  <h4 className="font-syne text-sm font-bold text-white border-b border-white/10 pb-2">
                    Itemized Rental Breakdown ({days} Days)
                  </h4>

                  <div className="flex justify-between text-slate-300">
                    <span>Base Vehicle Rate ({formatPrice(car.pricePerDay)} x {days} days)</span>
                    <span className="font-bold text-white">{formatPrice(baseCarTotal)}</span>
                  </div>

                  {formData.selectedAddOns.map((name, i) => {
                    const addon = addOnsList.find(a => a.name === name);
                    const cost = (addon ? addon.pricePerDay : 0) * days;
                    return (
                      <div key={i} className="flex justify-between text-slate-400 pl-3 border-l-2 border-[#E2F163]/50">
                        <span>+ {name}</span>
                        <span className="text-white">{formatPrice(cost)}</span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between text-slate-400 pt-2 border-t border-white/10">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Tax (8%)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>Security Deposit (Refundable)</span>
                    <span>{formatPrice(depositAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold pt-3 border-t border-white/10 text-white">
                    <span className="font-syne">Total Payment Due</span>
                    <span className="text-[#E2F163] text-xl">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Step 3 Actions */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full bg-white/5 text-slate-300 font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-[#E2F163] text-black font-syne font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4e450] shadow-[0_0_25px_rgba(226,241,99,0.4)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Processing Telemetry Lock...</span>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Confirm & Lock Reservation ({formatPrice(grandTotal)})</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
};
