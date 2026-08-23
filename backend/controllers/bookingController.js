const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { getIsConnected } = require('../config/db');
const { memoryCars } = require('./carController');

let memoryBookings = [
  {
    id: "bk-1001",
    _id: "bk-1001",
    bookingCode: "RES-9842-X",
    carId: "car-1",
    carTitle: "Porsche 911 GT3 RS",
    customerName: "Alexander Vance",
    email: "a.vance@monocle-editorial.ch",
    phone: "+41 79 492 10 99",
    driverLicense: "CH-849204-P",
    startDate: "2026-08-25",
    endDate: "2026-08-28",
    days: 3,
    totalPrice: 4050,
    deposit: 500,
    addOns: ["Full Coverage Insurance (Track)", "Personal Concierge Delivery"],
    status: "confirmed",
    createdAt: new Date().toISOString()
  }
];

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const {
      carId,
      carTitle,
      customerName,
      email,
      phone,
      driverLicense,
      startDate,
      endDate,
      days,
      totalPrice,
      deposit,
      addOns
    } = req.body;

    if (!customerName || !email || !phone || !startDate || !endDate || !carId) {
      return res.status(400).json({ success: false, message: 'Missing required booking parameters' });
    }

    const bookingCode = `RES-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

    const newBookingData = {
      carId,
      carTitle: carTitle || 'Luxury Performance Vehicle',
      customerName,
      email,
      phone,
      driverLicense: driverLicense || 'Verified License',
      startDate,
      endDate,
      days: days || 1,
      totalPrice: Number(totalPrice),
      deposit: deposit ? Number(deposit) : 500,
      addOns: addOns || [],
      status: 'confirmed',
      bookingCode
    };

    if (getIsConnected()) {
      const created = await Booking.create(newBookingData);
      
      // Update car availability notice
      await Car.findByIdAndUpdate(carId, {
        availabilityNotice: `Reserved (${startDate} - ${endDate})`
      }).catch(() => null);

      return res.status(201).json({ success: true, data: created });
    } else {
      const created = {
        id: `bk-${Date.now()}`,
        _id: `bk-${Date.now()}`,
        ...newBookingData,
        createdAt: new Date().toISOString()
      };

      memoryBookings.unshift(created);

      // Update in-memory car notice
      const car = memoryCars.find(c => c.id === carId || c._id === carId);
      if (car) {
        car.availabilityNotice = `Reserved (${startDate} - ${endDate})`;
      }

      return res.status(201).json({ success: true, data: created });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/bookings
const getBookings = async (req, res) => {
  try {
    if (getIsConnected()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    } else {
      return res.json({ success: true, count: memoryBookings.length, data: memoryBookings });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const booking = await Booking.findById(id).catch(() => null) || await Booking.findOne({ bookingCode: id });
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: booking });
    } else {
      const booking = memoryBookings.find(b => b.id === id || b._id === id || b.bookingCode === id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: booking });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById
};
