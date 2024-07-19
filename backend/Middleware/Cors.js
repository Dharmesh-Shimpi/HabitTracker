export const corsOptions = {
	origin: '*', // Allowing requests from any origin for test
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
	allowedHeaders: 'Content-Type,Authorization', // Allowed request headers
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
