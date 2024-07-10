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
];

const habitSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: [...categories, 'Other'], 
		required: true,
	},
	customCategory: {
		type: String,
		required: function () {
			return this.category === 'Other'; //
		},
	},
	weeklyGoal: {
		type: String,
		required: true,
	},
	calendar: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Calendar',
		},
	],
	dailyStreak: {
		type: Number,
		default: 0,
	},
	goalStreak: {
		type: Number,
		default: 0,
	},
	monthlyStreak: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Habit', habitSchema);
