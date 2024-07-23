import express from 'express';
import Calendar from './Calendar.controller.js';

const router = express.Router();

// Calendar routes
router.get('/:habitId', Calendar.getMonth); 
router.patch('/:habitId/done', Calendar.markDateAsDone); 
router.patch('/:habitId', Calendar.getAdjacentMonth); 

export default router;
