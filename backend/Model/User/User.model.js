import mongoose from 'mongoose';
import { habitSchema } from '../Habit/Habit.model.js';
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: false,
	},
	habits: { type: [habitSchema], default: [] },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('User', userSchema);
