import express from 'express';
import Habit from '../Controller/Habit.controller.js';

const router = express.Router();

// Habit routes
router.get('/habits', Habit.getHabit); // Get all habits (authentication required)
router.post('/habits', Habit.createHabit); // Create a new habit (authentication required)
router.put('/habits/:habitId', Habit.updateHabit); // Update a habit (authentication required)
router.delete('/habits/:habitId', Habit.deleteHabit); // Delete a habit (authentication required)

export default router;
