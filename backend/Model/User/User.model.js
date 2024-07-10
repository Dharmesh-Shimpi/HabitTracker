import mongoose from 'mongoose';
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
	habits: [{ type: Schema.Types.ObjectId, ref: 'Habit' }],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('User', userSchema);
