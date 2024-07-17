export const corsOptions = {
	// https://habittracker-g2pu.onrender.com/
	origin: 'https://habittracker-g2pu.onrender.com/', // Allow requests from this origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
	allowedHeaders: 'Content-Type,Authorization', // Allowed request headers
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
