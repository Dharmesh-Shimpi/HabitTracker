import Habit from '../Model/Habit/Habit.repository.js';
import { Streak, Award } from '../Model/Habit/Steaks/Streaks.model.js';

export default class HabitController {
	// Get habits for the current user
	static async getHabit(req, res, next) {
		try {
			const id = req.cookies.id;
			if (!id) {
				return res.status(400).json({ message: 'User ID is required' });
			}

			const habits = await Habit.getHabit(id);
			res.json({ habits });
		} catch (err) {
			next(err);
		}
	}

	// Create a new habit for the current user
	static async createHabit(req, res, next) {
		try {
			const id = req.cookies.id;
			const { desc, goal } = req.body;

			if (!id || !desc || !goal) {
				return res
					.status(400)
					.json({ message: 'User ID, description, and goal are required' });
			}

			const newHabit = await Habit.createHabit({ id, desc, goal });
			res.status(201).json({ newHabit });
		} catch (err) {
			next(err);
		}
	}

	// Update a habit for the current user
	static async updateHabit(req, res, next) {
		try {
			const id = req.cookies.id;
			const habitId = req.params.habitId;
			const { desc, goal } = req.body;

			if (!id || !habitId || (!desc && !goal)) {
				return res.status(400).json({
					message:
						'User ID, habit ID, and at least one field (description or goal) are required',
				});
			}

			const updatedHabit = await Habit.updateHabit({ id, habitId, desc, goal });
			if (!updatedHabit) {
				return res.status(404).json({ message: 'Habit not found' });
			}

			res.json({ updatedHabit });
		} catch (err) {
			next(err);
		}
	}

	// Delete a habit for the current user
	static async deleteHabit(req, res, next) {
		try {
			const id = req.cookies.id;
			const habitId = req.params.habitId;

			if (!id || !habitId) {
				return res
					.status(400)
					.json({ message: 'User ID and habit ID are required' });
			}

			const result = await Habit.deleteHabit(id, habitId);
			if (!result) {
				return res.status(404).json({ message: 'Habit not found' });
			}

			res.json({ message: 'Habit deleted successfully' });
		} catch (err) {
			next(err);
		}
	}

	// Get all streaks
	static async getStreaks(req, res, next) {
		try {
			const streaks = await Streak.find();
			res.json({ streaks });
		} catch (err) {
			next(err);
		}
	}

	// Create a new streak
	static async createStreak(req, res, next) {
		try {
			const { name, description, type, requiredStreak } = req.body;

			if (!name || !type || !requiredStreak) {
				return res
					.status(400)
					.json({ message: 'Name, type, and required streak are required' });
			}

			const newStreak = new Streak({
				name,
				description,
				type,
				requiredStreak,
			});

			await newStreak.save();
			res.status(201).json({ newStreak });
		} catch (err) {
			next(err);
		}
	}

	// Get all awards
	static async getAwards(req, res, next) {
		try {
			const awards = await Award.find();
			res.json({ awards });
		} catch (err) {
			next(err);
		}
	}

	// Create a new award
	static async createAward(req, res, next) {
		try {
			const { name, description, type } = req.body;

			if (!name || !type) {
				return res.status(400).json({ message: 'Name and type are required' });
			}

			const newAward = new Award({
				name,
				description,
				type,
			});

			await newAward.save();
			res.status(201).json({ newAward });
		} catch (err) {
			next(err);
		}
	}
}
