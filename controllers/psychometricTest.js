import User from '../models/Users.js';

export const psychometricTest = async (req, res) => {
	const { label, description, options } = req.body;
	console.log(req.body);
};
