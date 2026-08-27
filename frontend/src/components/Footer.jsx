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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                <Car className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Veloce Car Rentals
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Simple, transparent self-drive and driver car rentals across Mumbai, Pune, Goa, Bangalore, Delhi NCR, and Hyderabad.
            </p>

            {/* Live Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>INDIA HEADQUARTERS • MUMBAI</span>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider">Popular Fleet</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Mahindra Thar LX 4x4</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Toyota Fortuner Legender</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Hyundai Creta SX</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">Tata Nexon EV Max</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition-colors">BMW 3 Series Limousine</a></li>
            </ul>
          </div>

          {/* Directory Column 2 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider">Top Cities</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Mumbai Airport</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Pune City</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Goa Airport</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Bangalore City</a></li>
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Delhi NCR T3</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-slate-400 text-xs font-sans">
              Subscribe for weekend offers, road trip guides, and new car arrivals.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="your.email@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-full pl-4 pr-10 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-xs font-mono text-amber-400 animate-in fade-in">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © 2026 VELOCE CAR RENTALS INDIA. MUMBAI • PUNE • GOA • BANGALORE • DELHI.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Rental</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
