import express from 'express';
import User from './Controller/User.controller.js';
import Habit from './Controller/Habit.controller.js';
import Calendar from './Controller/Calendar.controller.js';
import Auth from './Middleware/jwtAuth.js';

const router = express.Router();

// User routes
router.post('/register', User.register); // Register a new user
router.get('/register/oauth', User.getOauthURL); // Get OAuth URL for registration
router.post('/register/oauth', User.OauthRegister); // Handle OAuth registration
router.post('/login', User.login); // Login user
router.get('/verify', Auth.verify); // Verify JWT token
router.get('/logout', User.logOut); // Logout user

// Habit routes
router.get('/habits', Auth.verify, Habit.getHabit); // Get all habits (authentication required)
router.post('/habits', Auth.verify, Habit.createHabit); // Create a new habit (authentication required)
router.put('/habits/:habitId', Auth.verify, Habit.updateHabit); // Update a habit (authentication required)
router.delete('/habits/:habitId', Auth.verify, Habit.deleteHabit); // Delete a habit (authentication required)

// Calendar routes
router.post('/calendar', Auth.verify, Calendar.createCalendar); // Create a calendar entry for a user and habit

router.patch('/calendar/:habitId/done', Auth.verify, Calendar.markDateAsDone); // Mark a specific date as done for a habit

router.patch('/calendar/:habitId/streak', Auth.verify, Calendar.updateStreak); // Update the streak for a habit

router.get(
	'/calendar/:habitId/three-days',
	Auth.verify,
	Calendar.getThreeDays,
); // Get entries for yesterday, today, and tomorrow

router.get('/calendar/:habitId/month', Auth.verify, Calendar.getMonth); // Get calendar entries for a specific month and year

router.get(
	'/calendar/:habitId/month/adjacent',
	Auth.verify,
	Calendar.getAdjacentMonth,
); // Get calendar entries for the previous or next month

export default router;
