import Habit from '../Model/Habit/Habit.repository.js';
import User from '../Model/User/User.model.js';
import appError from '../Middleware/errors.js';

export default class HabitController {
	static async createHabit(req, res, next) {
		try {
            const { email, data } = req.body;
            const newHabit = await Habit.createHabit(data);
			const user = User.findOne({ email });
            if (user) {
				res.json({ newHabit }); 
			} else {
				throw new appError('User not found', 404);
			}
		} catch (err) {
			next(err);
		}
	} 
}