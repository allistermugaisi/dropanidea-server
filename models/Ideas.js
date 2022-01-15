import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
		level: {
			type: String,
			required: true,
		},
		likeCount: {
			type: Number,
			default: 0,
		},
		isIdeaActive: {
			type: Boolean,
			default: false,
		},
		conceptualist: {
			type: Schema.Types.ObjectId,
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
