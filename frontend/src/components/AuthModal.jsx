import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, registerUser, setToast } = useRental();
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginUser(formData.email, formData.password);
        if (res.success) {
          setIsAuthModalOpen(false);
          setFormData({ name: '', email: '', phone: '', password: '' });
        } else {
          setErrorMsg(res.message || 'Login failed');
        }
      } else {
        const res = await registerUser(formData.name, formData.email, formData.phone, formData.password);
        if (res.success) {
          setIsAuthModalOpen(false);
          setFormData({ name: '', email: '', phone: '', password: '' });
        } else {
          setErrorMsg(res.message || 'Registration failed');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setMode('login');
    setFormData({
      ...formData,
      email: 'admin@veloce.in',
      password: 'admin123'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div 
        className="glass-panel w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 relative shadow-2xl text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="font-syne text-2xl font-bold text-slate-900">
            {mode === 'login' ? 'Account Login' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-xs font-sans">
            {mode === 'login' 
              ? 'Access your reservations or manage system fleet' 
              : 'Join Veloce for instant reservations and simple booking management'}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl font-mono text-xs">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition-all font-bold cursor-pointer ${
              mode === 'login' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-xl transition-all font-bold cursor-pointer ${
              mode === 'register' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          {mode === 'register' && (
            <div>
              <label className="text-slate-600 block mb-1 font-semibold">Full Name *</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-600 block mb-1 font-semibold">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-slate-600 block mb-1 font-semibold">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-600 block mb-1 font-semibold">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Admin Demo Quick Fill Helper */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={fillAdminCredentials}
            className="text-[11px] font-mono text-amber-700 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Fill Demo Admin Credentials (admin@veloce.in)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
