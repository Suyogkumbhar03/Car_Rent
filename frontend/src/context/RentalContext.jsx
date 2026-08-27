import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCars, fetchBookingsAPI, submitBookingAPI, createCarAPI, updateCarAPI, loginAPI, registerAPI, getMeAPI } from '../utils/api';

const RentalContext = createContext();

const initialFallbackCars = [
  {
    id: "car-1",
    _id: "car-1",
    title: "Mahindra Thar LX 4x4",
    brand: "Mahindra",
    model: "Thar",
    year: 2024,
    category: "SUV",
    powertrain: "Diesel",
    specs: {
      speed: "155 km/h",
      acceleration: "10.2s 0-100",
      range: "750 km",
      transmission: "6-Speed Automatic",
      seats: 4,
      horsepower: "130 HP",
      driveType: "4WD"
    },
    pricePerDay: 3500,
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 68,
    location: "Mumbai",
    availabilityNotice: "Instant Pickup",
    description: "Iconic Indian 4x4 off-roader with removable hard top, touchscreen infotainment, and high ground clearance for mountain & highway trips."
  },
  {
    id: "car-2",
    _id: "car-2",
    title: "Toyota Fortuner Legender 4x4",
    brand: "Toyota",
    model: "Fortuner",
    year: 2024,
    category: "SUV",
    powertrain: "Diesel",
    specs: {
      speed: "190 km/h",
      acceleration: "9.8s 0-100",
      range: "800 km",
      transmission: "6-Speed Automatic",
      seats: 7,
      horsepower: "204 HP",
      driveType: "4x4"
    },
    pricePerDay: 6500,
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.95,
    reviewsCount: 112,
    location: "Goa",
    availabilityNotice: "Available at Airport",
    description: "Premium 7-seater SUV with sequential turn indicators, dual-tone roof, ventilated seats, and bulletproof Toyota reliability."
  },
  {
    id: "car-3",
    _id: "car-3",
    title: "Tata Nexon EV Max",
    brand: "Tata",
    model: "Nexon EV",
    year: 2024,
    category: "EV",
    powertrain: "Electric",
    specs: {
      speed: "140 km/h",
      acceleration: "8.9s 0-100",
      range: "453 km",
      transmission: "Automatic",
      seats: 5,
      horsepower: "143 HP",
      driveType: "FWD"
    },
    pricePerDay: 2200,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.85,
    reviewsCount: 54,
    location: "Bangalore",
    availabilityNotice: "100% Charged",
    description: "India's bestselling electric SUV. Fast DC charging support, wireless phone charging, air purifier, and 5-star GNCAP safety rating."
  },
  {
    id: "car-4",
    _id: "car-4",
    title: "Hyundai Creta SX (O) Turbo",
    brand: "Hyundai",
    model: "Creta",
    year: 2024,
    category: "SUV",
    powertrain: "Petrol",
    specs: {
      speed: "180 km/h",
      acceleration: "9.2s 0-100",
      range: "680 km",
      transmission: "7-Speed DCT",
      seats: 5,
      horsepower: "160 HP",
      driveType: "FWD"
    },
    pricePerDay: 2500,
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.88,
    reviewsCount: 95,
    location: "Delhi NCR",
    availabilityNotice: "Available Immediately",
    description: "Feature-packed compact SUV with panoramic sunroof, Bose sound system, ADAS Level 2 safety suite, and dual 10.25-inch screens."
  },
  {
    id: "car-5",
    _id: "car-5",
    title: "Maruti Suzuki Swift ZXi+",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2024,
    category: "Hatchback",
    powertrain: "Petrol",
    specs: {
      speed: "165 km/h",
      acceleration: "11.8s 0-100",
      range: "700 km",
      transmission: "5-Speed AMT",
      seats: 5,
      horsepower: "82 HP",
      driveType: "FWD"
    },
    pricePerDay: 1500,
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.82,
    reviewsCount: 140,
    location: "Pune",
    availabilityNotice: "Instant Delivery",
    description: "Frugal and agile hatchback perfect for city commutes and weekend getaways. Excellent fuel economy and easy parking."
  },
  {
    id: "car-6",
    _id: "car-6",
    title: "BMW 3 Series Gran Limousine",
    brand: "BMW",
    model: "3 Series Gran Limousine",
    year: 2024,
    category: "Luxury",
    powertrain: "Petrol",
    specs: {
      speed: "250 km/h",
      acceleration: "6.2s 0-100",
      range: "650 km",
      transmission: "8-Speed Steptronic",
      seats: 5,
      horsepower: "258 HP",
      driveType: "RWD"
    },
    pricePerDay: 12000,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.96,
    reviewsCount: 42,
    location: "Mumbai",
    availabilityNotice: "Driver Available",
    description: "Extended wheelbase luxury sedan offering extra rear legroom, BMW Curved Display, ambient lighting, and dynamic TwinPower Turbo performance."
  },
  {
    id: "car-7",
    _id: "car-7",
    title: "Mercedes-Benz E-Class LWB",
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2024,
    category: "Luxury",
    powertrain: "Diesel",
    specs: {
      speed: "240 km/h",
      acceleration: "7.4s 0-100",
      range: "850 km",
      transmission: "9G-TRONIC",
      seats: 5,
      horsepower: "194 HP",
      driveType: "RWD"
    },
    pricePerDay: 15000,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.98,
    reviewsCount: 38,
    location: "Delhi NCR",
    availabilityNotice: "Executive Dispatch",
    description: "The gold standard for executive luxury transport in India. Reclining rear seats, MBUX infotainment, and air suspension comfort."
  },
  {
    id: "car-8",
    _id: "car-8",
    title: "Audi Q7 55 TFSI Quattro",
    brand: "Audi",
    model: "Q7",
    year: 2024,
    category: "Luxury",
    powertrain: "Petrol",
    specs: {
      speed: "250 km/h",
      acceleration: "5.9s 0-100",
      range: "620 km",
      transmission: "8-Speed Tiptronic",
      seats: 7,
      horsepower: "340 HP",
      driveType: "AWD"
    },
    pricePerDay: 18000,
    images: [
      "https://images.unsplash.com/photo-1541348263662-e082662d82da?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200&auto=format&fit=crop"
    ],
    isAvailable: true,
    rating: 4.94,
    reviewsCount: 29,
    location: "Hyderabad",
    availabilityNotice: "Available in 2 hrs",
    description: "Commanding 7-seater luxury SUV powered by a 3.0L V6 TFSI engine with Quattro all-wheel drive, Matrix LED headlights, and Bang & Olufsen audio."
  }
];

const currencyRates = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' }
};

export const RentalProvider = ({ children }) => {
  const [cars, setCars] = useState(initialFallbackCars);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('INR');
  
  // Auth state
  const [token, setToken] = useState(() => localStorage.getItem('veloce_token') || '');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('veloce_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Filtering & Search
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    powertrain: 'All',
    maxPrice: 25000,
    availableOnly: false
  });

  // Modal & Drawer states
  const [selectedCarForModal, setSelectedCarForModalState] = useState(null); // Booking checkout modal

  const setSelectedCarForModal = (car) => {
    if (!car) {
      setSelectedCarForModalState(null);
      return;
    }

    if (!user) {
      showToast('Please sign in or create an account to book a car.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    if (user.role === 'admin') {
      showToast('Admin accounts manage fleet & sales records. Customer accounts are used for booking.', 'info');
      return;
    }

    setSelectedCarForModalState(car);
  };
  const [selectedCarForDetail, setSelectedCarForDetail] = useState(null); // Specs drawer modal
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Bookings list drawer
  const [isCompareOpen, setIsCompareOpen] = useState(false); // Vehicle comparison drawer
  const [comparedCarIds, setComparedCarIds] = useState([]); // List of car IDs to compare
  const [isAdminOpen, setIsAdminOpen] = useState(false); // Admin management view
  const [toast, setToast] = useState(null);

  // Quick Booking Widget state
  const [quickSearchState, setQuickSearchState] = useState({
    location: 'Mumbai',
    startDate: '2026-08-28',
    endDate: '2026-08-31',
    category: 'All'
  });

  // Verify stored token on mount
  useEffect(() => {
    if (token && !user) {
      getMeAPI(token).then(res => {
        if (res.success && res.user) {
          setUser(res.user);
          localStorage.setItem('veloce_user', JSON.stringify(res.user));
        } else {
          logout();
        }
      });
    }
  }, [token]);

  const loginUser = async (email, password) => {
    const res = await loginAPI(email, password);
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('veloce_token', res.token);
      localStorage.setItem('veloce_user', JSON.stringify(res.user));
      showToast(`Welcome back, ${res.user.name}!`, 'success');
    }
    return res;
  };

  const registerUser = async (name, email, phone, password) => {
    const res = await registerAPI(name, email, phone, password);
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('veloce_token', res.token);
      localStorage.setItem('veloce_user', JSON.stringify(res.user));
      showToast('Account registered successfully!', 'success');
    }
    return res;
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('veloce_token');
    localStorage.removeItem('veloce_user');
    setIsAdminOpen(false);
    showToast('Logged out successfully', 'info');
  };

  const toggleCompareCar = (carId) => {
    setComparedCarIds(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 cars at a time', 'info');
        return prev;
      }
      showToast('Added vehicle to comparison', 'success');
      return [...prev, carId];
    });
  };

  const clearComparison = () => {
    setComparedCarIds([]);
  };

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

  // Format Price Helper (Direct INR)
  const formatPrice = (amount) => {
    if (!amount && amount !== 0) return '₹0';
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  // Create Booking
  const handleCreateBooking = async (bookingData) => {
    try {
      const payload = {
        ...bookingData,
        userId: user ? (user.id || user._id) : null
      };

      let created;
      try {
        const res = await submitBookingAPI(payload);
        created = res.data;
      } catch (err) {
        // Fallback local creation if API unreachable
        created = {
          id: `bk-${Date.now()}`,
          _id: `bk-${Date.now()}`,
          bookingCode: `RES-${Math.floor(1000 + Math.random() * 9000)}-Z`,
          ...payload,
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
      user,
      token,
      isAdmin: Boolean(user && user.role === 'admin'),
      isAuthModalOpen,
      setIsAuthModalOpen,
      loginUser,
      registerUser,
      logout,
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
      isCompareOpen,
      setIsCompareOpen,
      comparedCarIds,
      toggleCompareCar,
      clearComparison,
      isAdminOpen,
      setIsAdminOpen,
      quickSearchState,
      setQuickSearchState,
      toast,
      showToast,
      handleCreateBooking,
      handleToggleCarAvailability,
      handleAddCar,
      loadCarsData,
      loadBookingsData
    }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => useContext(RentalContext);
