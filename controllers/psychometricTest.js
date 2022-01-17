import User from '../models/Users.js';

export const psychometricTest = async (req, res) => {
	try {
		let userId = req.userId;
		let answeredQuiz = {
			question: req.body.question,
			answer: req.body.answer,
			timestamp: new Date(),
		};

		await User.findOneAndUpdate(
			{
				_id: userId, // find user by id
			},
			{ $push: { psychometricTest: answeredQuiz } } // push test question to User model by id
		);

		res.status(200).json({ message: 'New question added' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
