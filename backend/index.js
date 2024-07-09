import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes.js';
import cors from 'cors';
import appError from './Middleware/errors.js';
import { corsOptions } from './Middleware/Cors.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('views', 'views');
app.use(express.static('views'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', routes);
app.use((err, req, res) => appError.error(err, res));

export default app;
