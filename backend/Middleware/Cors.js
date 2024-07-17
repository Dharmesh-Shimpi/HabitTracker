export const corsOptions = {
	origin: '*', // Allow requests from any origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
	allowedHeaders: 'Content-Type,Authorization', // Allowed request headers
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
