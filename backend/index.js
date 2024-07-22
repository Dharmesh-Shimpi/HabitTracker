import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appError from './Middleware/errors.js';
import { corsOptions } from './Middleware/Cors.js';
import User from './src/Users/User.routes.js';
import Habit from './src/Habit/Habits.routes.js';
import Calendar from './src/Calendar/Calendar.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', User);
app.use('/api/habits', Habit);
app.use('/api/calendar', Calendar);
app.use((err, req, res) => appError.error(err, res));

export default app;
