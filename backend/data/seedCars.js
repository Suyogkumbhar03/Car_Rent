const seedCars = [
  {
    id: "car-1",
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
      driveType: "4WD Manual Transfer"
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
    description: "Iconic Indian 4x4 off-roader with removable hard top, touchscreen infotainment, and high ground clearance for mountain & highway trips.",
    maintenanceHistory: [
      { date: "2024-07-10", type: "Periodic 10,000 km Service", status: "Passed", mileage: "10,200 km" }
    ]
  },
  {
    id: "car-2",
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
      driveType: "4x4 Dual-Range"
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
    description: "Premium 7-seater SUV with sequential turn indicators, dual-tone roof, ventilated seats, and bulletproof Toyota reliability.",
    maintenanceHistory: [
      { date: "2024-08-01", type: "Full Brake & Suspension Inspection", status: "Passed", mileage: "18,400 km" }
    ]
  },
  {
    id: "car-3",
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
      transmission: "Automatic Single-Speed",
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
    description: "India's bestselling electric SUV. Fast DC charging support, wireless phone charging, air purifier, and 5-star GNCAP safety rating.",
    maintenanceHistory: [
      { date: "2024-07-25", type: "EV Battery Health & Software Diagnostics", status: "Passed", mileage: "8,900 km" }
    ]
  },
  {
    id: "car-4",
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
    description: "Feature-packed compact SUV with panoramic sunroof, Bose sound system, ADAS Level 2 safety suite, and dual 10.25-inch screens.",
    maintenanceHistory: [
      { date: "2024-06-15", type: "General Service & Engine Oil Change", status: "Passed", mileage: "14,100 km" }
    ]
  },
  {
    id: "car-5",
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
    description: "Frugal and agile hatchback perfect for city commutes and weekend getaways. Excellent fuel economy and easy parking.",
    maintenanceHistory: [
      { date: "2024-08-05", type: "Standard Maintenance & Tire Rotation", status: "Passed", mileage: "12,000 km" }
    ]
  },
  {
    id: "car-6",
    title: "BMW 3 Series Gran Limousine M Sport",
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
    description: "Extended wheelbase luxury sedan offering extra rear legroom, BMW Curved Display, ambient lighting, and dynamic TwinPower Turbo performance.",
    maintenanceHistory: [
      { date: "2024-07-18", type: "BMW Service Inclusive Audit", status: "Passed", mileage: "7,500 km" }
    ]
  },
  {
    id: "car-7",
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
    description: "The gold standard for executive luxury transport in India. Reclining rear seats, MBUX infotainment, and air suspension comfort.",
    maintenanceHistory: [
      { date: "2024-08-12", type: "Air Suspension Diagnostics & Brake Fluid Change", status: "Passed", mileage: "9,100 km" }
    ]
  },
  {
    id: "car-8",
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
      driveType: "Quattro AWD"
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
    description: "Commanding 7-seater luxury SUV powered by a 3.0L V6 TFSI engine with Quattro all-wheel drive, Matrix LED headlights, and Bang & Olufsen audio.",
    maintenanceHistory: [
      { date: "2024-07-05", type: "Quattro AWD System Inspection", status: "Passed", mileage: "6,800 km" }
    ]
  }
];

module.exports = seedCars;
