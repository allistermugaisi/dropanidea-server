import mongoose from 'mongoose';
const mongoose = mongoose.Schema;

const discussionsSchema = Schema(
	{
		creator: String,
		message: String,
		tags: [String],
		selectedFile: String,
		likeCount: {
			type: Number,
			default: 0,
		},
		idea: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Ideas',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Discussions', discussionsSchema);
