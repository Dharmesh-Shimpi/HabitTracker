import axios from 'axios';
// 'https://habittracker-backend-6psa.onrender.com/api'
// http://localhost:5000/api
const api = axios.create({
	baseURL: 'https://habittracker-backend-6psa.onrender.com/api',
});

export default api;
