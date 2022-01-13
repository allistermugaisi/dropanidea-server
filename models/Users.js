import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema(
	{
		username: {
			type: String,
			maxlength: 50,
			required: true,
		},
		name: {
			type: String,
			maxlength: 50,
			required: true,
		},
		company_name: {
			type: String,
			maxlength: 50,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			unique: 1,
			required: true,
		},
		password: {
			type: String,
			minlength: 8,
			required: true,
		},
		role: {
			type: String,
			maxlength: 50,
			required: true,
		},
		gender: {
			type: String,
			maxlength: 50,
		},
		psychometricTest: {
			type: Array,
			default: [],
		},
		isUserActive: {
			type: Boolean,
			default: false,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		profileCompleted: {
			type: Boolean,
			default: false,
		},
		ideas: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Ideas',
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Users', userSchema);
