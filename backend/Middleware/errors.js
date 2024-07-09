export default class appError extends Error {
	constructor(message, status) {
		super(message); 
		this.status = status;
	}

	static error(err, req, res, next) {
		if (err instanceof appError) {
			res.status(err.status).json({ error: err.message });
		}
	}
}
