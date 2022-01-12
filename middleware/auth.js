import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, 'encryptedJWTSecret');

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		res
			.status(401)
			.json({ message: 'No token or invalid token, authorization denied' });
		console.log('Token error');
	}
};

export default auth;
