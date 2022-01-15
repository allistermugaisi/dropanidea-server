import Discussions from '../models/Discussions.js';
import User from '../models/Users.js';
import Ideas from '../models/Ideas.js';
import { auth } from '../middleware/auth.js';

export const createDiscussion = async (req, res) => {
	const { message, tags, selectedFile, photoURL, userId, ideaId } = req.body;
	// console.log(req.body);

	try {
		// Simple validation
		if (!message || !userId || !ideaId)
			return res.status(400).json({ message: 'Please enter all fields!' });

		// Create an discussion
		const createdDiscussion = await Discussions.create({
			message,
			tags,
			selectedFile,
			photoURL,
			creator: userId,
			idea: ideaId,
		});

		// appendUserDiscussionArray
		await User.findOneAndUpdate(
			{
				_id: createdDiscussion.creator._id, // find user by id
			},
			{ $push: { contributions: createdDiscussion._id } } // push discussion array to User model by id
		);

		// appendIdeaDiscussionArray
		await Ideas.findOneAndUpdate(
			{
				_id: createdDiscussion.idea._id, // find idea by id
			},
			{ $push: { discussions: createdDiscussion._id } } // push discussion array to Idea model by id
		);

		res.status(200).json({ message: 'New discussion created!' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getUserDiscussions = async (req, res) => {
	try {
		let getUserDiscussions = await Discussions.find({
			creator: req.params.userId,
		})
			.populate('creator')
			.populate('idea');

		res.status(200).json(getUserDiscussions);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getIdeaDiscussions = async (req, res) => {};
