export const corsOptions = {
	// https://habittracker-g2pu.onrender.com/
	origin: 'http://localhost:5173', // Allow requests from this origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
	allowedHeaders: 'Content-Type,Authorization', // Allowed request headers
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
