import express from 'express';
import Habit from './Habit.controller.js';

const router = express.Router();

// Habit routes
router.get('/:id', Habit.getHabit); 
router.post('/:id', Habit.createHabit);  
router.delete('/:id/:habitId', Habit.deleteHabit); 

export default router;
