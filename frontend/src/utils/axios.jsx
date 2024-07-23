// 'https://habittracker-backend-6psa.onrender.com/api'
// http://localhost:5000/api

import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

export const calendarAPI = axios.create({
	baseURL: import.meta.env.VITE_CALENDAR_URL,
});

export const habitAPI = axios.create({
	baseURL: import.meta.env.VITE_HABITS_URL,
});

export default api;
