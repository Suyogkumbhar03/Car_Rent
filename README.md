# 🚗 Veloce — Premium Car Rental Management Platform

Veloce is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for online car rentals and fleet management. Designed for simplicity and speed, Veloce offers a high-contrast modern interface with role-based access control for customers and administrators.

---

## 🔗 Live Links & Demo

- 🌐 **Live Demo (Frontend)**: [https://car-rent-theta-opal.vercel.app/](https://car-rent-theta-opal.vercel.app/)
- ⚙️ **Backend API (Render)**: [https://car-rent-bdf8.onrender.com/api/health](https://car-rent-bdf8.onrender.com/api/health)
- 💻 **GitHub Repository**: [https://github.com/Suyogkumbhar03/Car_Rent.git](https://github.com/Suyogkumbhar03/Car_Rent.git)

---

## ✨ Key Features

### 👤 For Customers:
- **Browse Fleet Catalog**: Filter vehicles by category (Luxury, SUV, Sedan, Electric), powertrain, and daily rates in **₹ INR**.
- **Side-by-Side Specs Matrix**: Compare vehicle technical specifications (acceleration 0-100, top speed, horsepower, gearbox).
- **Mandatory Authentication Guard**: Guests can explore the fleet, but must sign in or create an account before reserving a car.
- **My Reservations**: View active bookings and print instant reservation passes matching the logged-in email.

### 🛡️ For Administrators (`admin@veloce.in`):
- **Role-Based Scope**: Admins manage platform inventory and monitor sales — all "Book Now" buttons are automatically hidden for Admin accounts.
- **Add Vehicles to Fleet**: Upload vehicle image URLs, technical specifications, locations, and daily rental pricing.
- **Sales & Revenue Tracking**: Monitor customer bookings, revenue metrics, and toggle vehicle availability status in real-time.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express.js, Mongoose (MongoDB Atlas)
- **Security & Auth**: JWT (JSON Web Tokens), Bcrypt.js password hashing
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 📁 Project Structure

```text
Car_Rent/
├── backend/
│   ├── config/          # MongoDB database connection
│   ├── controllers/     # Auth, Car, and Booking business logic
│   ├── data/            # Fallback seed data
│   ├── middleware/      # JWT protection & Admin guards
│   ├── models/          # User, Car, and Booking Mongoose schemas
│   ├── routes/          # API route definitions
│   └── server.js        # Express application entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Hero, CarCard, Modals, Dashboards
│   │   ├── context/     # RentalContext state management
│   │   ├── utils/       # API fetch wrappers
│   │   └── App.jsx      # Main frontend application
│   └── vercel.json      # Frontend Vercel configuration
├── package.json         # Root monorepo build script
└── README.md            # Project documentation
```

---

## 🔑 Default Credentials

To test the **Admin Role**:
- **Email**: `admin@veloce.in`
- **Password**: `admin123`

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas string or local MongoDB instance

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the frontend dev server:
```bash
npm run dev
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
