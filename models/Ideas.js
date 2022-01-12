import mongoose from 'mongoose';
const mongoose = mongoose.Schema;

const ideasSchema = Schema(
	{
		title: {
			type: String,
			maxlength: 50,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		likeCount: {
			type: Number,
			default: 0,
		},
		conceptualist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
		discussions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Discussions',
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Ideas', ideasSchema);
