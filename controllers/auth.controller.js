// packages
import bcrypt from 'bcryptjs';
// models
import User from '../models/user.model.js';
// utils
import { generateToken } from '../utils/generate-token.js';

// signup logic
export const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		// username check
		const isValid = /^[a-zA-Z0-9._-]+$/.test(username);
		if(!isValid) { return res.status(400).json({ error: 'Username can only contain letters, numbers, ".", "_", and or "-".' }); }
		const usernameTaken = await User.findOne({ username });
		if (usernameTaken) { return res.status(400).json({ error: 'Username already taken.' }); }
		// email format check
		var emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
		if (!emailRegex.test(email)) { return res.status(400).json({ error: 'Invalid email format.' }); }
		// user email check
		const userExists = await User.findOne({ email });
		if (userExists) { return res.status(400).json({ error: 'User already exists.' }); }
		// password check
		if (password.length < 8) { return res.status(400).json({ error: 'Password must be at least 8 characters long.' }); }
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		// create user
		const newUser = await User.create({ username, email, password: hashed, displayName: username });
		if (newUser) {
			// generate JWT
			generateToken(newUser._id, res);
			await newUser.save();
			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				displayName: newUser.username,
			});
		} else {
			res.status(400).json({ error: 'Invalid user data.' });
		}
	} catch (error) {
		console.log('Error in signup controller:', error.message);
		res.status(500).json({ error: 'Internal server error.' });
	}
};

// signin logic
export const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPassCorrect = await bcrypt.compare(password, user?.password || '');
		if (!user || !isPassCorrect) { return res.status(400).json({ error: 'Invalid email or password.' }); }
		// generate JWT
		generateToken(user._id, res);
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			displayName: user.displayName,
		});
	} catch (error) {
		console.log('Error in signin controller:', error.message);
		res.status(500).json({ error: 'Internal server error.' });
	}
};

// signout logic
export const signout = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge:0 });
		res.status(200).json({ message:'Logged out successfully.' });
	} catch (error) {
		console.log('Error in signout controller:', error.message);
		res.status(500).json({ error: 'Internal server error.' });
	}
};

// get user logic
export const getMe = async (req, res) => {
	try {
		console.log('trying to get me: ', req.user._id)
		//const user = await User.findById(req.user._id).select('-password');
		//res.status(200).json(user);
		res.status(200).json(req.user);
	} catch (error) {
		console.log('Error in getMe controller:', error.message);
		res.status(500).json({ error: 'Internal server error.' });
	}
};