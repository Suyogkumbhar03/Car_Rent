import React from 'react';
import { RentalProvider, useRental } from './context/RentalContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FleetCatalog } from './components/FleetCatalog';
import { ExperienceSection } from './components/ExperienceSection';
import { BookingModal } from './components/BookingModal';
import { CarDetailModal } from './components/CarDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { BookingDrawer } from './components/BookingDrawer';
import { Footer } from './components/Footer';

import { CompareDrawer } from './components/CompareDrawer';
import { AuthModal } from './components/AuthModal';

const ToastPopup = () => {
  const { toast } = useRental();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
      <div className={`px-5 py-3 rounded-2xl glass-panel border font-mono text-xs shadow-2xl flex items-center gap-2 ${
        toast.type === 'error' ? 'border-red-500/50 text-red-400' :
        toast.type === 'success' ? 'border-[#E6C687]/50 text-[#E6C687]' :
        'border-white/20 text-white'
      }`}>
        <span className="w-2 h-2 rounded-full bg-[#E6C687] animate-pulse" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#E6C687] selection:text-black">
      <div>
        <Navbar />
        <main className="space-y-12">
          <HeroSection />
          <FleetCatalog />
          <ExperienceSection />
        </main>
      </div>

      <Footer />

      {/* Modals & Slide-over Drawers */}
      <AuthModal />
      <BookingModal />
      <CarDetailModal />
      <AdminDashboard />
      <BookingDrawer />
      <CompareDrawer />
      
      {/* Toast popup */}
      <ToastPopup />
    </div>
  );
};

export function App() {
  return (
    <RentalProvider>
      <MainLayout />
    </RentalProvider>
  );
}

export default App;
