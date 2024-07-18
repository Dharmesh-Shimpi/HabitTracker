import express from 'express';
import User from '../Controller/User.controller.js';
import Auth from '../Middleware/jwtAuth.js';

const router = express.Router();

// User routes
router.post('/register', User.register); // Register a new user
router.get('/register/oauth', User.getOauthURL); // Get OAuth URL for registration
router.post('/register/oauth', User.OauthRegister); // Handle OAuth registration
router.post('/login', User.login); // Login user
router.get('/verify/:token', Auth.verify); // Verify JWT token
router.get('/logout', User.logOut); // Logout user

export default router;