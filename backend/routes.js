import express from 'express';
import User from './Controller/User.controller.js';
import Habit from './Controller/Habit.controller.js';
import Streak from './Controller/Streak.controller.js';
import Calendar from './Controller/Calendar.controller.js';
import Auth from './Middleware/jwtAuth.js';

const router = express.Router();

// User routes
router.post('/register', User.register);
router.get('/register/oauth', User.getOauthURL);
router.post('/register/oauth', User.OauthRegister);
router.post('/login', User.login);
router.get('/verify', Auth.verify);
router.get('/logout', User.logOut);

// Habit routes
router.get('/habits', Habit.getHabit);
router.post('/habits', Habit.createHabit);
router.put('/habits/:habitId', Habit.updateHabit);
router.delete('/habits/:habitId', Habit.deleteHabit);

// Calendar routes
router.get('/calendar', Auth.verify, Calendar.getCalendar);
router.get(
	'/calendar/next/:month/:year',
	Auth.verify,
	Calendar.getNextCalendar,
);
router.get(
	'/calendar/prev/:month/:year',
	Auth.verify,
	Calendar.getPrevCalendar,
);
router.post('/calendar/done', Auth.verify, Calendar.markDateAsDone);
router.post('/calendar', Auth.verify, Calendar.createCalendar);

// Streak routes
router.get('/streaks', Streak.getStreaks);
router.get('/awards', Streak.getAwards);

export default router;
