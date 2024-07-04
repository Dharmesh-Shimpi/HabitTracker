import express from 'express';
import User from './Controller/User.controller.js';
import { verify, auth } from './Middleware/jwtAuth.js';

const router = express.Router();

router.post('/register', User.register);
router.get('/register/oauth', User.getOauthURL);
router.post('/register/oauth', User.OauthRegister);
router.post('/login', User.login);
router.get('/verify', verify);
router.post('/', auth, );

export default router;
