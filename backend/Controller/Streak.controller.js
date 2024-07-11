// Streak.controller.js
import StreakAwardRepo from '../Model/Habit/Streaks/Streaks.repository.js';

export default class Streak {
	// Get all streaks with associated awards
	static async getStreaks(req, res, next) {
		try {
			const streaks = await StreakAwardRepo.getStreaks();
			res.json({ streaks });
		} catch (err) {
			next(err);
		}
	}

	// Get all awards
	static async getAwards(req, res, next) {
		try {
			const awards = await StreakAwardRepo.getAwards();
			res.json({ awards });
		} catch (err) {
			next(err);
		}
	}
}
