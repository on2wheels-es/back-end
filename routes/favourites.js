const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.patch('/addToFavourites/:id/:type', async (req, res, next) => {
	const { id, type } = req.params;
	// eslint-disable-next-line no-underscore-dangle
	const userID = req.session.currentUser._id;

	try {
		if (type === 'mountainPasses') {
			const user = await User.findByIdAndUpdate(userID, { $push: { favouritePasses: id } }, { new: true });
			req.session.currentUser = user;
			return res.json(user);
		}
		if (type === 'routes') {
			const user = await User.findByIdAndUpdate(userID, { $push: { favouriteRoutes: id } }, { new: true });
			req.session.currentUser = user;
			return res.json(user);
		}
		const user = await User.findByIdAndUpdate(userID, { $push: { favouriteLocations: id } }, { new: true });
		req.session.currentUser = user;
		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
