import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const discussionsSchema = Schema(
	{
		message: String,
		tags: [String],
		selectedFile: String,
		photoURL: String,
		replies: [String],
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		idea: {
			type: Schema.Types.ObjectId,
			ref: 'Ideas',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Discussions', discussionsSchema);
