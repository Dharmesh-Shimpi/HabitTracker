import express from 'express';
import Calendar from './Calendar.controller.js';

const router = express.Router();
// Calendar routes

router.patch('/:habitId/done', Calendar.markDateAsDone); // Mark a specific date as done for a habit

router.get('/:habitId', Calendar.getMonth); // Get calendar entries for a specific month and year

router.patch('/:habitId', Calendar.getAdjacentMonth); // Get calendar entries for the previous or next month

export default router;
