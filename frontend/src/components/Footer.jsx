import React, { useState, useEffect } from 'react';
import { Clock, Send, ShieldCheck, Car, Heart, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const [localTime, setLocalTime] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#07080B] text-slate-300 border-t border-white/10 pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E2F163] text-black flex items-center justify-center font-bold">
                <Car className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Veloce Editorial
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              High-performance automotive rental, concierge delivery, and telemetry management tailored for alpine highways, track sessions, and executive transfers.
            </p>

            {/* Live Clock Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E2F163]">
              <Clock className="w-3.5 h-3.5" />
              <span>ZURICH HQ TIME: {localTime || '14:30:00'} CET</span>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider">Fleet Catalog</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#fleet" className="hover:text-[#E2F163] transition-colors">Porsche 911 GT3 RS</a></li>
              <li><a href="#fleet" className="hover:text-[#E2F163] transition-colors">Ferrari 296 GTB</a></li>
              <li><a href="#fleet" className="hover:text-[#E2F163] transition-colors">Lucid Air Sapphire</a></li>
              <li><a href="#fleet" className="hover:text-[#E2F163] transition-colors">Aston Martin DBS 770</a></li>
              <li><a href="#fleet" className="hover:text-[#E2F163] transition-colors">Mercedes-AMG G 63</a></li>
            </ul>
          </div>

          {/* Directory Column 2 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider">Concierge</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#experiences" className="hover:text-[#E2F163] transition-colors">Alpine Delivery</a></li>
              <li><a href="#experiences" className="hover:text-[#E2F163] transition-colors">Track Telemetry</a></li>
              <li><a href="#experiences" className="hover:text-[#E2F163] transition-colors">Carbon Offsetting</a></li>
              <li><a href="#experiences" className="hover:text-[#E2F163] transition-colors">Private Jet Hangar</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider">
              Editorial Gazette
            </h4>
            <p className="text-slate-400 text-xs font-sans">
              Subscribe for exclusive alpine drive dispatches and rare fleet additions.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="driver@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#0B0D11] border border-white/10 rounded-full pl-4 pr-10 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#E2F163]"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#E2F163] text-black flex items-center justify-center hover:bg-[#d4e450] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-xs font-mono text-[#E2F163] animate-in fade-in">
                  ✓ Dispatch added to editorial subscription.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Big Editorial Watermark */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © 2026 VELOCE AUTOMOTIVE AG. ZURICH • GENEVA • ST. MORITZ.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Telemetry Disclosures</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Rental</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
