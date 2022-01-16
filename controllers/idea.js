import Ideas from '../models/Ideas.js';
import User from '../models/Users.js';

export const createIdea = async (req, res) => {
	const { title, description, level, userId } = req.body;
	// console.log(req.body);

	try {
		// Simple validation
		if (!title || !description || !level || !userId)
			return res.status(400).json({ message: 'Please enter all fields!' });

		// Create an idea
		const createdIdea = await Ideas.create({
			title,
			description,
			level,
			conceptualist: userId,
			isIdeaActive: true,
		});

		// appendUserIdeaArray
		await User.findOneAndUpdate(
			{
				_id: createdIdea.conceptualist._id, // find user by id
			},
			{ $push: { ideas: createdIdea._id } } // push idea array to User model by id
		);

		res.status(200).json({ message: 'New idea created!' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getIdeas = async (req, res) => {
	try {
		let getIdeas = await Ideas.find().populate('discussions');
		res.status(200).json(getIdeas);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getUserIdeas = async (req, res) => {
	try {
		let getUserIdeas = await Ideas.find({
			conceptualist: req.params.userId,
		})
			.populate('conceptualist')
			.populate('discussions');

		res.status(200).json(getUserIdeas);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
