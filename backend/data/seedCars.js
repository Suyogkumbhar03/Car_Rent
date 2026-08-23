const seedCars = [
  {
    id: "car-1",
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

module.exports = seedCars;
