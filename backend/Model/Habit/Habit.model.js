import mongoose from 'mongoose';
const { Schema } = mongoose;

const categories = [
	'Physical Activities',
	'Meditation',
	'Creative Tasks',
	'Educational Activities',
	'Healthy Eating',
	'Relaxation',
	'New Hobbies',
	'Eco-Friendly Tasks',
	'Digital Management',
	'Reading',
	'Other',
];

const habitSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	weeklyGoal: {
		type: String,
		required: true,
	},
	
	currentStreak: {
		type: Number,
		default: 0,
		required: true,
	},

	maxStreak: {
		type: Number,
		default: 0,
		required: true,
	},
});

export default mongoose.model('Habit', habitSchema);
