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
    currency,
    user,
    isAdmin
  } = useRental();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    customerName: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? (user.phone || '') : '',
    driverLicense: 'CH-LIC-9482',
    licenseFilePreview: null,
    startDate: quickSearchState.startDate || '2026-08-25',
    endDate: quickSearchState.endDate || '2026-08-28',
    selectedAddOns: ['Full Coverage Insurance (Track)']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Auto pre-fill logged-in user info if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: prev.customerName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  // Add-ons list definition
  const addOnsList = [
    { id: 'insurance', name: 'Full Car Insurance', pricePerDay: 500, desc: 'Complete insurance coverage with zero extra charge for accidental damage.' },
    { id: 'concierge', name: 'Doorstep Car Delivery & Pickup', pricePerDay: 300, desc: 'We deliver the car directly to your home, hotel, or airport terminal.' },
    { id: 'driver', name: 'Extra Driver Allowance', pricePerDay: 200, desc: 'Allow a second person to drive the car legally during your trip.' },
    { id: 'telemetry', name: 'GPS Navigation System', pricePerDay: 150, desc: 'Pre-installed GPS navigation with live traffic guidance.' }
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

  // Financial Calculations
  const baseCarTotal = car.pricePerDay * days;
  
  const addOnsTotalPerDay = formData.selectedAddOns.reduce((sum, name) => {
    const found = addOnsList.find(a => a.name === name);
    return sum + (found ? found.pricePerDay : 0);
  }, 0);

  const addOnsTotal = addOnsTotalPerDay * days;
  const subtotal = baseCarTotal + addOnsTotal;
  const taxAmount = subtotal * 0.05;
  const depositAmount = 2000;
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
      alert('Please fill in your name, email, and phone number.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      
      <div 
        className="glass-panel w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-slate-200 bg-white text-slate-900 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="font-mono text-[10px] text-amber-700 uppercase tracking-widest block font-bold">
              EASY 3-STEP BOOKING
            </span>
            <h2 className="font-syne text-2xl font-bold text-slate-900">{car.title}</h2>
          </div>

          <button 
            onClick={handleCloseModal}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {!confirmedBooking && (
          <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center border-b border-slate-200 pb-4">
            <div className={`py-2 rounded-xl transition-all ${step === 1 ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-600'}`}>
              1. Dates & Extras
            </div>
            <div className={`py-2 rounded-xl transition-all ${step === 2 ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-600'}`}>
              2. Your Details
            </div>
            <div className={`py-2 rounded-xl transition-all ${step === 3 ? 'bg-amber-600 text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-600'}`}>
              3. Summary & Pay
            </div>
          </div>
        )}

        {/* Admin Role Notice Banner */}
        {isAdmin && !confirmedBooking && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center justify-between text-xs font-mono text-amber-900">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span><strong>Admin Notice:</strong> You are logged in as Admin. Admins manage fleet & view sales.</span>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-amber-700 uppercase tracking-widest font-bold">
                BOOKING CONFIRMED!
              </span>
              <h3 className="font-syne text-3xl font-extrabold text-slate-900">
                BOOKING ID: {confirmedBooking.bookingCode}
              </h3>
              <p className="text-slate-600 text-xs font-sans max-w-md mx-auto">
                Thank you, {confirmedBooking.customerName}! Your {car.title} is reserved for {confirmedBooking.startDate} to {confirmedBooking.endDate}.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-left font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Total Duration:</span>
                <span className="text-slate-900 font-bold">{confirmedBooking.days} Days</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Total Price:</span>
                <span className="text-amber-700 font-bold">{formatPrice(confirmedBooking.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security Deposit:</span>
                <span className="text-slate-900">{formatPrice(confirmedBooking.deposit)} (Refundable)</span>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="px-8 py-3 rounded-full bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 shadow-sm"
            >
              Back to Cars
            </button>
          </div>
        ) : (
          <>
            {/* STEP 1: Add-ons & Timeline selection */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Timeline pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Pickup Date</label>
                    <input 
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Return Date</label>
                    <input 
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Add-ons List */}
                <div className="space-y-3">
                  <h4 className="font-syne text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Optional Extra Features
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
                              ? 'bg-amber-50/80 border-amber-500 text-slate-900 shadow-sm' 
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-syne text-sm font-bold text-slate-900">{addon.name}</span>
                            </div>
                            <p className="text-xs text-slate-600">{addon.desc}</p>
                          </div>

                          <div className="text-right font-mono whitespace-nowrap">
                            <span className="text-xs font-bold text-amber-700">
                              +{formatPrice(addon.pricePerDay)}
                            </span>
                            <span className="text-[10px] text-slate-500 block">/day</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1 Footer Action */}
                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setStep(2)}
                    className="px-7 py-3 rounded-full bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-700 shadow-sm"
                  >
                    <span>Next: Your Information</span>
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
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Your Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Mobile Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Driver's License Document Preview */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">
                    Upload Driving License / ID Photo (Optional)
                  </label>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:border-amber-500 transition-colors relative">
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
                          className="h-28 mx-auto rounded-lg object-cover border border-slate-200"
                        />
                        <p className="text-xs font-mono text-amber-700 font-bold">Photo Uploaded</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pointer-events-none">
                        <Upload className="w-8 h-8 text-amber-600 mx-auto" />
                        <p className="text-xs font-mono text-slate-700 font-bold">Click here to upload driving license image</p>
                        <p className="text-[10px] text-slate-500 font-mono">JPG, PNG, or PDF</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="flex justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!formData.customerName || !formData.email || !formData.phone) {
                        alert('Please fill in your Name, Email, and Phone Number.');
                        return;
                      }
                      setStep(3);
                    }}
                    className="px-7 py-3 rounded-full bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-700 shadow-sm"
                  >
                    <span>Next: Summary & Price</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Timeline & Cost Breakdown */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Itemized Receipt */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
                  <h4 className="font-syne text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Price Breakdown ({days} Days)
                  </h4>

                  <div className="flex justify-between text-slate-700">
                    <span>Car Daily Rate ({formatPrice(car.pricePerDay)} x {days} days)</span>
                    <span className="font-bold text-slate-900">{formatPrice(baseCarTotal)}</span>
                  </div>

                  {formData.selectedAddOns.map((name, i) => {
                    const addon = addOnsList.find(a => a.name === name);
                    const cost = (addon ? addon.pricePerDay : 0) * days;
                    return (
                      <div key={i} className="flex justify-between text-slate-600 pl-3 border-l-2 border-amber-500">
                        <span>+ {name}</span>
                        <span className="text-slate-900 font-semibold">{formatPrice(cost)}</span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Tax (5%)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Refundable Security Deposit</span>
                    <span>{formatPrice(depositAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold pt-3 border-t border-slate-200 text-slate-900">
                    <span className="font-syne">Total Amount to Pay</span>
                    <span className="text-amber-700 text-xl">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Step 3 Actions */}
                <div className="flex justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-amber-600 text-white font-syne font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-700 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Saving your booking...</span>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Confirm & Book Now ({formatPrice(grandTotal)})</span>
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
