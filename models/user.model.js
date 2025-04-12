// packages
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	displayName: {
		type: String,
		required: true,
	},
}, {
	timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;