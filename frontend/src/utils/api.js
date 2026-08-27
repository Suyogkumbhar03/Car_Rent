const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('[API Client Error]: Auth login failed', err);
    return { success: false, message: 'Server connection failed' };
  }
};

export const registerAPI = async (name, email, phone, password) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('[API Client Error]: Auth register failed', err);
    return { success: false, message: 'Server connection failed' };
  }
};

export const getMeAPI = async (token) => {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return { success: false };
  }
};

export const fetchCars = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.type && filters.type !== 'All') queryParams.append('type', filters.type);
    if (filters.powertrain && filters.powertrain !== 'All') queryParams.append('powertrain', filters.powertrain);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.availableOnly) queryParams.append('available', 'true');

    const response = await fetch(`${API_BASE}/cars?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch cars');
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.warn('[API Client Warning]: Backend server connection offline/loading, using fallback mode.', err);
    return null;
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/cars/${id}`);
    if (!response.ok) throw new Error('Failed to fetch car detail');
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.warn('[API Client Warning]: Car detail fetch fallback.', err);
    return null;
  }
};

export const submitBookingAPI = async (bookingPayload) => {
  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit booking');
    }
    return await response.json();
  } catch (err) {
    console.warn('[API Client Warning]: Booking API fallback active.', err);
    throw err;
  }
};

export const fetchBookingsAPI = async () => {
  try {
    const response = await fetch(`${API_BASE}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.warn('[API Client Warning]: Bookings list fetch fallback.', err);
    return null;
  }
};

export const createCarAPI = async (carPayload) => {
  try {
    const response = await fetch(`${API_BASE}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carPayload)
    });
    if (!response.ok) throw new Error('Failed to create car');
    return await response.json();
  } catch (err) {
    console.warn('[API Client Warning]: Create car fallback.', err);
    throw err;
  }
};

export const updateCarAPI = async (id, updates) => {
  try {
    const response = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update car');
    return await response.json();
  } catch (err) {
    console.warn('[API Client Warning]: Update car fallback.', err);
    throw err;
  }
};
