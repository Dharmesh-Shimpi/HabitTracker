import express from 'express';
import User from './Controller/User.controller.js';
import Habit from './Controller/Habit.controller.js';
import Auth from './Middleware/jwtAuth.js';

const router = express.Router();

router.post('/register', User.register);
router.get('/register/oauth', User.getOauthURL);
router.post('/register/oauth', User.OauthRegister);
router.post('/login', User.login);
router.get('/verify', Auth.verify);
router.get('/habits', Habit.getHabit);
router.post('/habits', Habit.createHabit);
router.put('/habits/:habitId', Habit.updateHabit);
router.delete('/habits/:habitId', Habit.deleteHabit);
router.get('/logout', User.logOut);
router.get('/calendar', )

export default router;
