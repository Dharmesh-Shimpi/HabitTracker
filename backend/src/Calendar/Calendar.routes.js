import express from 'express';
import Calendar from './Calendar.controller.js';

const router = express.Router();
// Calendar routes

router.patch('/calendar/:habitId/done', Calendar.markDateAsDone); // Mark a specific date as done for a habit

router.patch('/calendar/:habitId/streak', Calendar.updateStreak); // Update the streak for a habit

router.get('/calendar/:habitId/three-days', Calendar.getThreeDays); // Get entries for yesterday, today, and tomorrow

router.get('/calendar/:habitId/month', Calendar.getMonth); // Get calendar entries for a specific month and year

router.get('/calendar/:habitId/month/adjacent', Calendar.getAdjacentMonth); // Get calendar entries for the previous or next month

export default router;
