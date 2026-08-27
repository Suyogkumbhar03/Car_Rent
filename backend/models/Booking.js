const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  carId: { type: String, required: true },
  carTitle: { type: String },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  driverLicense: { type: String, default: 'uploaded_doc_ref' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  days: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  deposit: { type: Number, default: 500 },
  addOns: [{ type: String }],
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'confirmed' 
  },
  bookingCode: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
