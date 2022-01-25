import Discussions from '../models/Discussions.js';
import User from '../models/Users.js';
import Ideas from '../models/Ideas.js';

export const createDiscussion = async (req, res) => {
	const { message, tags, selectedFile, photoURL, ideaId, replies } = req.body;

	let userId = req.userId;

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
			replies,
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

		// // appendIdeaDiscussionArray
		await Ideas.findOneAndUpdate(
			{
				_id: createdDiscussion.idea._id, // find idea by id
			},
			{ $push: { discussions: createdDiscussion._id } } // push discussion array to Idea model by id
		);

		res.status(200).json({ message: 'New discussion created!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

// export const getUserDiscussions = async (req, res) => {
// 	try {
// 		let getUserDiscussions = await Discussions.find({
// 			creator: req.params.userId,
// 		}).populate('idea');
// 		// .populate('idea');

// 		res.status(200).json(getUserDiscussions);
// 	} catch (error) {
// 		res.status(500).json({ message: error });
// 	}
// };

export const getAllDiscussions = async (req, res) => {
	try {
		let getDiscussions = await Discussions.find()
			.populate('creator')
			.populate('idea');
		res.status(200).json(getDiscussions);
	} catch (error) {
		// console.log(error);
		res.status(500).json({ message: error });
	}
};

export const deleteDiscussion = async (req, res) => {
	try {
		await Discussions.findByIdAndDelete({
			_id: req.params.discussionId,
		});

		// Remember to delete id in contributions & discussions arrays in Users & Ideas model respectively
		res.status(200).json({ message: 'Discussion deleted successfully!' });
	} catch (error) {
		// console.log(error);
		res.status(500).json({ message: error });
	}
};
