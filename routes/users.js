const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.post('/user', async (req, res, next) => {
	const { userID } = req.body;

	try {
		const user = await User.findById(userID)
			.populate('favouriteRoutes')
			.populate('favouritePasses')
			.populate('favouriteLocations');
		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
