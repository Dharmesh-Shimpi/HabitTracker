import { Schema, model } from "mongoose";

export const streakSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	type: {
		type: String,
		required: true,
	},
	requiredStreak: {
		type: Number,
		required: true,
	},
});

export const Streak = model('Streak', streakSchema);

// Award Schema
export const awardSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	type: {
		type: String,
		required: true,
	},
});

export const Award = model('Award', awardSchema);
