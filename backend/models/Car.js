const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true, enum: ['Supercar', 'Executive', 'SUV', 'Track'] },
  powertrain: { type: String, required: true, enum: ['EV', 'Hybrid', 'V8', 'Twin-Turbo'] },
  specs: {
    speed: String,
    acceleration: String,
    range: String,
    transmission: String,
    seats: Number,
    horsepower: String,
    driveType: String
  },
  pricePerDay: { type: Number, required: true },
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 12 },
  location: { type: String, default: 'Zurich HQ' },
  availabilityNotice: { type: String, default: 'Available Immediately' },
  description: String,
  maintenanceHistory: [
    {
      date: String,
      type: String,
      status: String,
      mileage: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
