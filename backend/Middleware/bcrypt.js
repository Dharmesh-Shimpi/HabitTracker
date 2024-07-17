import bcrypt from 'bcryptjs';

// Function to hash a password
export async function hashPassword(password) {
	const saltRounds = 10; // The cost factor, controls how much time is needed to calculate a single BCrypt hash
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.error('Error hashing password:', error);
		throw error;
	}
}

// Function to verify a password against a hash
export async function verifyPassword(password, hashedPassword) {
	try {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	} catch (error) {
		console.error('Error verifying password:', error);
		throw error;
	}
}
