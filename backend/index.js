import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import { error } from './Middleware/errors.js';
import { corsOptions } from './Middleware/Cors.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('views', 'views');
app.use(express.static('views'));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', routes);
app.use(error);

export default app;
