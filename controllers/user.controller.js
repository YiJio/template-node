// packages
// models
import User from '../models/user.model.js';

// get user logic (by uid instead)
export const getUser = async (req, res) => {
	const { uid } = req.params;
	try {
		const user = await User.findById(uid).select('-password');
		if(!user) { return res.status(404).json({ message: 'User not found.' }); }
		return res.status(200).json(user);
	} catch (error) {
		console.log('Error in getUser controller:', error.message);
		res.status(500).json({ error: 'Internal server error.' });
	}
};