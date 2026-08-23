import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCars, fetchBookingsAPI, submitBookingAPI, createCarAPI, updateCarAPI } from '../utils/api';

const RentalContext = createContext();

const initialFallbackCars = [
  {
    id: "car-1",
    _id: "car-1",
    title: "Porsche 911 GT3 RS",
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    category: "Track",
    powertrain: "V8",
    specs: {
      speed: "312 km/h",
      acceleration: "3.2s 0-100",
      range: "520 km",
      transmission: "7-Speed PDK",
      seats: 2,
      horsepower: "525 HP",
      driveType: "RWD"
    },
    pricePerDay: 1250,
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.98,
    reviewsCount: 42,
    location: "Zurich HQ",
    availabilityNotice: "Available in 1 hr",
    description: "Built for peak downforce and razor-sharp lap efficiency. Featuring active aerodynamics, DRS wing integration, and lightweight carbon composite construction.",
    maintenanceHistory: [
      { date: "2024-07-15", type: "Full Aero Track Inspection", status: "Passed", mileage: "4,200 km" },
      { date: "2024-05-10", type: "Ceramic Brake Rotor Servicing", status: "Passed", mileage: "2,800 km" }
    ]
  },
  {
    id: "car-2",
    _id: "car-2",
    title: "Polestar 1 Special Edition",
    brand: "Polestar",
    model: "Polestar 1",
    year: 2023,
    category: "Executive",
    powertrain: "Hybrid",
    specs: {
      speed: "250 km/h",
      acceleration: "4.2s 0-100",
      range: "125 km EV / 750 km Total",
      transmission: "8-Speed Auto",
      seats: 4,
      horsepower: "609 HP",
      driveType: "AWD"
    },
    pricePerDay: 890,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.92,
    reviewsCount: 28,
    location: "Geneva Hub",
    availabilityNotice: "Available Immediately",
    description: "An editorial statement in Swedish minimalism. Carbon fiber body, Öhlins Dual Flow Valve dampers, and a handcrafted acoustic cabin.",
    maintenanceHistory: [
      { date: "2024-08-01", type: "Hybrid System Calibration", status: "Passed", mileage: "8,100 km" },
      { date: "2024-03-12", type: "Öhlins Suspension Tune", status: "Passed", mileage: "5,400 km" }
    ]
  },
  {
    id: "car-3",
    _id: "car-3",
    title: "Lucid Air Sapphire",
    brand: "Lucid",
    model: "Air Sapphire",
    year: 2024,
    category: "Executive",
    powertrain: "EV",
    specs: {
      speed: "330 km/h",
      acceleration: "1.89s 0-100",
      range: "687 km",
      transmission: "Single-Speed Direct",
      seats: 5,
      horsepower: "1,230 HP",
      driveType: "Tri-Motor AWD"
    },
    pricePerDay: 1450,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.99,
    reviewsCount: 35,
    location: "Zurich HQ",
    availabilityNotice: "Available in 30 mins",
    description: "The pinnacle of ultra-luxury electric performance. 900V+ architecture, Sapphire Blue metallic finish, and track-tuned torque vectoring.",
    maintenanceHistory: [
      { date: "2024-08-10", type: "Battery Diagnostics & Firmware v3.2", status: "Passed", mileage: "3,100 km" }
    ]
  },
  {
    id: "car-4",
    _id: "car-4",
    title: "Aston Martin DBS 770 Ultimate",
    brand: "Aston Martin",
    model: "DBS 770",
    year: 2024,
    category: "Supercar",
    powertrain: "Twin-Turbo",
    specs: {
      speed: "340 km/h",
      acceleration: "3.4s 0-100",
      range: "480 km",
      transmission: "8-Speed ZF Auto",
      seats: 2,
      horsepower: "770 HP",
      driveType: "RWD"
    },
    pricePerDay: 1800,
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.96,
    reviewsCount: 19,
    location: "St. Moritz Terminal",
    availabilityNotice: "Available Tomorrow",
    description: "A ferocious 5.2L V12 flagship. Finished in Satin Titanium, featuring semi-aniline leather quilting and carbon fiber weave throughout.",
    maintenanceHistory: [
      { date: "2024-06-20", type: "V12 Powertrain Health Check", status: "Passed", mileage: "1,900 km" }
    ]
  },
  {
    id: "car-5",
    _id: "car-5",
    title: "Mercedes-AMG G 63 Grand Edition",
    brand: "Mercedes-Benz",
    model: "AMG G 63",
    year: 2024,
    category: "SUV",
    powertrain: "V8",
    specs: {
      speed: "240 km/h",
      acceleration: "4.5s 0-100",
      range: "510 km",
      transmission: "9G-TRONIC",
      seats: 5,
      horsepower: "585 HP",
      driveType: "4MATIC AWD"
    },
    pricePerDay: 1100,
    images: [
      "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: false,
    rating: 4.89,
    reviewsCount: 54,
    location: "Zurich HQ",
    availabilityNotice: "Reserved until Aug 28",
    description: "Iconic military lineage re-imagined for alpine grandeur. MANUFAKTUR night black magno with Tech Gold foil striping.",
    maintenanceHistory: [
      { date: "2024-07-02", type: "Diff Lock & Transfer Case Service", status: "Passed", mileage: "12,400 km" }
    ]
  },
  {
    id: "car-6",
    _id: "car-6",
    title: "Ferrari 296 GTB Assetto Fiorano",
    brand: "Ferrari",
    model: "296 GTB",
    year: 2024,
    category: "Supercar",
    powertrain: "Hybrid",
    specs: {
      speed: "330 km/h",
      acceleration: "2.9s 0-100",
      range: "25 km EV / 500 km Total",
      transmission: "8-Speed F1 Dual-Clutch",
      seats: 2,
      horsepower: "830 HP",
      driveType: "RWD"
    },
    pricePerDay: 2100,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 5.0,
    reviewsCount: 16,
    location: "Geneva Hub",
    availabilityNotice: "Available Immediately",
    description: "Mid-rear engine 120° V6 turbo plug-in hybrid. Multimatic shock absorbers, high-downforce carbon front attachments, and Assetto Fiorano livery.",
    maintenanceHistory: [
      { date: "2024-08-18", type: "Pre-Rental Telemetry Audit", status: "Passed", mileage: "1,150 km" }
    ]
  }
];

const currencyRates = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.78, label: 'GBP (£)' },
  JPY: { symbol: '¥', rate: 155, label: 'JPY (¥)' }
};

export const RentalProvider = ({ children }) => {
  const [cars, setCars] = useState(initialFallbackCars);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  
  // Filtering & Search
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    powertrain: 'All',
    maxPrice: 2500,
    availableOnly: false
  });

  // Modal & Drawer states
  const [selectedCarForModal, setSelectedCarForModal] = useState(null); // Booking checkout modal
  const [selectedCarForDetail, setSelectedCarForDetail] = useState(null); // Specs drawer modal
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Bookings list drawer
  const [isAdminOpen, setIsAdminOpen] = useState(false); // Admin management view
  const [toast, setToast] = useState(null);

  // Quick Booking Widget state
  const [quickSearchState, setQuickSearchState] = useState({
    location: 'Zurich Airport Terminal 1',
    startDate: '2026-08-25',
    endDate: '2026-08-28',
    category: 'All'
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch cars from Express API or fallback
  const loadCarsData = async () => {
    setLoading(true);
    const data = await fetchCars(filters);
    if (data && data.length > 0) {
      setCars(data);
    } else {
      setCars(initialFallbackCars);
    }
    setLoading(false);
  };

  // Fetch bookings list
  const loadBookingsData = async () => {
    const data = await fetchBookingsAPI();
    if (data) {
      setBookings(data);
    }
  };

  useEffect(() => {
    loadCarsData();
    loadBookingsData();
  }, [filters]);

  // Format Price Helper
  const formatPrice = (amountInUSD) => {
    const rateInfo = currencyRates[currency] || currencyRates.USD;
    const converted = Math.round(amountInUSD * rateInfo.rate);
    return `${rateInfo.symbol}${converted.toLocaleString()}`;
  };

  // Create Booking
  const handleCreateBooking = async (bookingData) => {
    try {
      let created;
      try {
        const res = await submitBookingAPI(bookingData);
        created = res.data;
      } catch (err) {
        // Fallback local creation if API unreachable
        created = {
          id: `bk-${Date.now()}`,
          _id: `bk-${Date.now()}`,
          bookingCode: `RES-${Math.floor(1000 + Math.random() * 9000)}-Z`,
          ...bookingData,
          createdAt: new Date().toISOString()
        };
      }

      setBookings(prev => [created, ...prev]);
      
      // Update local car state availability notice
      setCars(prev => prev.map(c => {
        if (c.id === bookingData.carId || c._id === bookingData.carId) {
          return {
            ...c,
            availabilityNotice: `Reserved (${bookingData.startDate} to ${bookingData.endDate})`
          };
        }
        return c;
      }));

      showToast(`Reservation ${created.bookingCode} confirmed successfully!`, 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Failed to complete reservation', 'error');
      throw err;
    }
  };

  // Toggle Car Availability (Admin)
  const handleToggleCarAvailability = async (carId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await updateCarAPI(carId, { isAvailable: newStatus });
    } catch (e) {}

    setCars(prev => prev.map(c => {
      if (c.id === carId || c._id === carId) {
        return { ...c, isAvailable: newStatus };
      }
      return c;
    }));
    showToast(`Vehicle status updated to ${newStatus ? 'Available' : 'Reserved'}`, 'info');
  };

  // Add New Car (Admin)
  const handleAddCar = async (newCarPayload) => {
    try {
      let created;
      try {
        const res = await createCarAPI(newCarPayload);
        created = res.data;
      } catch (e) {
        created = {
          id: `car-${Date.now()}`,
          _id: `car-${Date.now()}`,
          ...newCarPayload,
          isAvailable: true,
          rating: 5.0,
          reviewsCount: 1,
          maintenanceHistory: [
            { date: new Date().toISOString().split('T')[0], type: 'Pre-Delivery Inspection', status: 'Passed', mileage: '0 km' }
          ]
        };
      }
      setCars(prev => [created, ...prev]);
      showToast(`${created.title} added to fleet catalog`, 'success');
      return created;
    } catch (err) {
      showToast('Failed to add car', 'error');
    }
  };

  return (
    <RentalContext.Provider value={{
      cars,
      bookings,
      loading,
      currency,
      setCurrency,
      currencyRates,
      formatPrice,
      filters,
      setFilters,
      selectedCarForModal,
      setSelectedCarForModal,
      selectedCarForDetail,
      setSelectedCarForDetail,
      isDrawerOpen,
      setIsDrawerOpen,
      isAdminOpen,
      setIsAdminOpen,
      quickSearchState,
      setQuickSearchState,
      toast,
      showToast,
      handleCreateBooking,
      handleToggleCarAvailability,
      handleAddCar,
      loadCarsData
    }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => useContext(RentalContext);
