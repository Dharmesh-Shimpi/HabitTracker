import server from './index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectDatabase() {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 60000,
		});
	} catch (error) {
		console.log(error);
	}
}

server.listen(process.env.PORT, () => {
	connectDatabase();
	console.log('server is listening at port 5000');
});
