import axios from 'axios';

const api = axios.create({
	baseURL: 'https://habittracker-backend-6psa.onrender.com/api',
	withCredentials: true,
});

export default api;
