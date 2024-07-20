import express from 'express';
import Habit from './Habit.controller.js';

const router = express.Router();

// Habit routes
router.get('/:id/habits/', Habit.getHabit); // Get all habits (authentication required)
router.post('/:id/habits/', Habit.createHabit); // Create a new habit (authentication required)
router.put('/:id/habits/:habitId', Habit.updateHabit); // Update a habit (authentication required)
router.delete('/:id/habits/:habitId', Habit.deleteHabit); // Delete a habit (authentication required)

export default router;
