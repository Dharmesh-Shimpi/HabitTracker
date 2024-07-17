import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appError from './Middleware/errors.js';
import { corsOptions } from './Middleware/Cors.js';
import User from './Routes/User.routes.js';
import Habit from './Routes/Habits.routes.js';
import Calendar from './Routes/Calendar.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('views', 'views');
app.use(express.static('views'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.get('/', (req, res) => res.render('index'));
app.use('/api', User);
app.use('/api', Habit);
app.use('/api', Calendar);
app.use((err, req, res) => appError.error(err, res));

export default app;
