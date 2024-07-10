import { Streak, Award } from './Streaks.model.js';
import Calendar from '../Calendar/Calendar.model.js';
import User from '../../User/User.model.js';
import appError from '../../../Middleware/errors.js';

export default class StreakAwardRepo {
	// Create a new streak
	static async createStreak({ name, description, type, requiredStreak }) {
		try {
			const newStreak = new Streak({ name, description, type, requiredStreak });
			await newStreak.save();
			return newStreak;
		} catch (err) {
			console.error(`Error creating streak. Error: ${err.message}`);
			throw new appError(`Error creating streak. Error: ${err}`, 401);
		}
	}

	// Create a new award
	static async createAward({ name, description, type }) {
		try {
			const newAward = new Award({ name, description, type });
			await newAward.save();
			return newAward;
		} catch (err) {
			console.error(`Error creating award. Error: ${err.message}`);
			throw new appError(`Error creating award. Error: ${err}`, 401);
		}
	}

	// Get all streaks
	static async getStreaks() {
		try {
			return await Streak.find();
		} catch (err) {
			console.error(`Error getting streaks. Error: ${err.message}`);
			throw new appError(`Error getting streaks. Error: ${err}`, 401);
		}
	}

	// Get all awards
	static async getAwards() {
		try {
			return await Award.find();
		} catch (err) {
			console.error(`Error getting awards. Error: ${err.message}`);
			throw new appError(`Error getting awards. Error: ${err}`, 401);
		}
	}

	// Update database for daily streaks
	static async updateDailyStreaks() {
		try {
			const users = await User.find().populate('habits');

			for (const user of users) {
				for (const habit of user.habits) {
					const calendarEntries = await Calendar.find({
						user: user._id,
						habit: habit._id,
					});
					const today = new Date();
					const todayEntry = calendarEntries.find(
						(entry) => entry.date.toDateString() === today.toDateString(),
					);

					if (todayEntry && todayEntry.done) {
						habit.dailyStreak += 1;
						habit.goalStreak += 1;
					} else {
						habit.dailyStreak = 0;
					}

					await habit.save();
				}
			}
		} catch (err) {
			console.error(`Error updating daily streaks. Error: ${err.message}`);
			throw new appError(`Error updating daily streaks. Error: ${err}`, 401);
		}
	}

	// Update database for weekly, monthly streaks and awards
	static async updateStreaksAndAwards() {
		try {
			const users = await User.find().populate('habits');

			for (const user of users) {
				for (const habit of user.habits) {
					const today = new Date();

					if (today.getDay() === 0) {
						// Sunday
						if (habit.dailyStreak >= 7) {
							habit.goalStreak += 1;
						}
						habit.dailyStreak = 0;
					}

					if (today.getDate() === 1) {
						// First day of the month
						if (habit.goalStreak >= 4) {
							habit.monthlyStreak += 1;
						}
						habit.goalStreak = 0;
					}

					await habit.save();
				}
			}
		} catch (err) {
			console.error(`Error updating streaks and awards. Error: ${err.message}`);
			throw new appError(`Error updating streaks and awards. Error: ${err}`, 401);
		}
	}
}
