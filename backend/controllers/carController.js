const Car = require('../models/Car');
const seedCars = require('../data/seedCars');
const { getIsConnected } = require('../config/db');

// In-memory array fallback if MongoDB is not connected
let memoryCars = [...seedCars];

// GET /api/cars (supports search, type, minPrice, maxPrice, powertrain, available)
const getCars = async (req, res) => {
  try {
    const { search, type, minPrice, maxPrice, powertrain, available } = req.query;

    if (getIsConnected()) {
      let query = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { model: { $regex: search, $options: 'i' } }
        ];
      }

      if (type && type !== 'All') {
        query.category = type;
      }

      if (powertrain && powertrain !== 'All') {
        query.powertrain = powertrain;
      }

      if (available === 'true') {
        query.isAvailable = true;
      }

      if (minPrice || maxPrice) {
        query.pricePerDay = {};
        if (minPrice) query.pricePerDay.$gte = Number(minPrice);
        if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
      }

      let cars = await Car.find(query).sort({ rating: -1 });

      // Seed if MongoDB collection is empty
      if (cars.length === 0 && !search && (!type || type === 'All') && (!powertrain || powertrain === 'All')) {
        await Car.insertMany(seedCars);
        cars = await Car.find(query).sort({ rating: -1 });
      }

      return res.json({ success: true, count: cars.length, data: cars });
    } else {
      // Memory Store Fallback Filtering
      let filtered = [...memoryCars];

      if (search) {
        const term = search.toLowerCase();
        filtered = filtered.filter(c => 
          c.title.toLowerCase().includes(term) ||
          c.brand.toLowerCase().includes(term) ||
          c.model.toLowerCase().includes(term)
        );
      }

      if (type && type !== 'All') {
        filtered = filtered.filter(c => c.category === type);
      }

      if (powertrain && powertrain !== 'All') {
        filtered = filtered.filter(c => c.powertrain === powertrain);
      }

      if (available === 'true') {
        filtered = filtered.filter(c => c.isAvailable === true);
      }

      if (minPrice) {
        filtered = filtered.filter(c => c.pricePerDay >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter(c => c.pricePerDay <= Number(maxPrice));
      }

      return res.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/cars/:id
const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const car = await Car.findById(id).catch(() => null) || await Car.findOne({ id });
      if (!car) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      return res.json({ success: true, data: car });
    } else {
      const car = memoryCars.find(c => c.id === id || c._id === id);
      if (!car) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      return res.json({ success: true, data: car });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cars (Add car)
const createCar = async (req, res) => {
  try {
    const carData = req.body;
    const newId = `car-${Date.now()}`;
    const newCar = {
      id: newId,
      ...carData,
      isAvailable: carData.isAvailable ?? true,
      rating: carData.rating || 5.0,
      reviewsCount: carData.reviewsCount || 1,
      maintenanceHistory: carData.maintenanceHistory || [
        { date: new Date().toISOString().split('T')[0], type: 'Initial Inspection', status: 'Passed', mileage: '0 km' }
      ]
    };

    if (getIsConnected()) {
      const created = await Car.create(newCar);
      return res.status(201).json({ success: true, data: created });
    } else {
      memoryCars.unshift(newCar);
      return res.status(201).json({ success: true, data: newCar });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PATCH /api/cars/:id (Toggle availability or edit)
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (getIsConnected()) {
      const updated = await Car.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Car not found' });
      }
      return res.json({ success: true, data: updated });
    } else {
      const idx = memoryCars.findIndex(c => c.id === id || c._id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Car not found' });
      }
      memoryCars[idx] = { ...memoryCars[idx], ...updates };
      return res.json({ success: true, data: memoryCars[idx] });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  memoryCars
};
