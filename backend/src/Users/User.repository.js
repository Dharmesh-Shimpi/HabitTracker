import UserSchema from './User.model.js';
import { hashPassword, verifyPassword } from '../Middleware/bcrypt.js';
import Auth from '../Middleware/jwtAuth.js';
import appError from '../Middleware/errors.js';

export default class UserRepo {
	static async registerUser(data) {
		try {
			const { name, email, password } = data;
			const hashedPassword = await hashPassword(password);
			const newUser = new UserSchema({
				username: name,
				email,
				passwordHash: hashedPassword,
			});
			await newUser.save();
			return newUser;
		} catch (err) {
			console.log(err.message);
			throw new appError('Error registering User', 401);
		}
	}

	static async loginUser(data) {
		const { email, password } = data;
		const user = await UserSchema.findOne({ email });

		if (!user) {
			throw new appError('No Account with entered email', 401);
		}
		const verifiedPassword = await verifyPassword(password, user.passwordHash);
		if (!verifiedPassword) {
			throw new appError('Password is Incorrect', 401);
		}
		const token = Auth.generateToken({ userId: user._id });
		return { token, id: user._id };
	}

	static async registerOauthUser(data) {
		try {
			const { name, email } = data;
			const user = await UserSchema.findOne({ email });
			if (user) return;
			const newUser = new UserSchema({
				username: name,
				email,
			});
			await newUser.save();
			return newUser;
		} catch (err) {
			console.log(err);
			throw new appError('Error creating Oauth User', 401);
		}
	}
}
