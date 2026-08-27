const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/car_rental_db';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });
    isConnected = true;
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (err) {
    console.log(`[MongoDB Warning]: Could not connect to MongoDB (${err.message}).`);
    console.log(`[Backend Info]: Running in resilient Standalone Memory Store Mode with initial seed data.`);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
