import Ideas from '../models/Ideas.js';
import User from '../models/Users.js';
import sendMail from './mail.js';

export const createIdea = async (req, res) => {
	const { title, description, level } = req.body;

	let userId = req.userId;

	try {
		// Simple validation
		if (!title || !description)
			return res.status(400).json({ message: 'Please enter all fields!' });

		const currentUser = await User.findById(userId);

		// getMartha user id
		// level = global

		if (currentUser.isAdmin) {
			// Create an Global idea
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

			const currentUsers = await User.find();

			currentUsers?.map((user) => {
				const { email } = user;
				const message = {
					from: 'ZinniaGlobalConsultancy <me@samples.mailgun.org>',
					to: email,
					subject: 'New Idea Available',
					html: '',
					text: '',
					attachment: '',
					template: 'zinniaglobalconsultancy-action',
				};

				sendMail(message, res);
			});

			res.status(200).json({ message: 'New idea created!' });
		} else {
			// Create an idea
			const createdIdea = await Ideas.create({
				title,
				description,
				level: currentUser.role,
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

			const currentUsers = await User.find();

			currentUsers?.map((user) => {
				const { email } = user;
				const message = {
					from: 'ZinniaGlobalConsultancy <me@samples.mailgun.org>',
					to: email,
					subject: 'New Idea Available',
					html: '',
					text: '',
					attachment: '',
					template: 'zinniaglobalconsultancy-action',
				};

				sendMail(message, res);
			});

			res.status(200).json({ message: 'New idea created!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getAllIdeas = async (req, res) => {
	try {
		let currentUser = await User.findById(req.userId);

		if (currentUser.isAdmin) {
			// Retrieve all Ideas
			let getAllIdeas = await Ideas.find()
				.populate('conceptualist')
				.populate('discussions');
			res.status(200).json(getAllIdeas);
		} else {
			res.status(200).json({
				message: `You can't view that resource, you're not an admin.`,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};

export const getIdeas = async (req, res) => {
	try {
		let currentUser = await User.findById(req.userId);

		// Ideas retrieved based on User role
		let getIdeas = await Ideas.find({
			$or: [{ level: currentUser.role }, { level: 'Global' }],
		})
			.populate('conceptualist')
			.populate('discussions');
		res.status(200).json(getIdeas);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getIdea = async (req, res) => {
	try {
		let getIdea = await Ideas.find({
			_id: req.params.ideaId,
		})
			.populate('conceptualist')
			.populate('discussions');
		res.status(200).json(getIdea);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const updateIdea = async (req, res) => {
	try {
		await Ideas.findByIdAndUpdate(
			{
				_id: req.params.ideaId,
			},
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json({ message: 'Idea updated successfully' });
	} catch (error) {
		// console.log(error);
		res.status(500).json({ message: error });
	}
};

export const deleteIdea = async (req, res) => {
	try {
		await Ideas.findByIdAndDelete({
			_id: req.params.ideaId,
		});

		// Remember to delete id in ideas array in Users model
		res.status(200).json({ message: 'Idea deleted successfully!' });
	} catch (error) {
		// console.log(error);
		res.status(500).json({ message: error });
	}
};

// export const getUserIdeas = async (req, res) => {
// 	try {
// 		let getUserIdeas = await Ideas.find({
// 			conceptualist: req.params.userId,
// 		})
// 			.populate('conceptualist')
// 			.populate('discussions');

// 		res.status(200).json(getUserIdeas);
// 	} catch (error) {
// 		res.status(500).json({ message: error });
// 	}
// };
