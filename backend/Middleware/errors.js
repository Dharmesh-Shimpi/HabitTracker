export default class appError {
	constructor(message, status) {
		this.message = message;
		this.status = status;
	}
}

export function error(err, req, res, next) {
	if (err) {
		if (err instanceof appError) {
			res.status(err.status).send(err.message);
		} else {
			res.status(500).send('Internal server error');
		}
	}
}
