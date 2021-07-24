const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.patch('/addToFavourites/:id/:type', async (req, res, next) => {
	const { id, type } = req.params;
	const { _id } = req.session.currentUser;

	try {
		if (type === 'mountainPasses') {
			const user = await User.findByIdAndUpdate(_id, { $push: { favouritePasses: id } }, { new: true });
			req.session.currentUser = user;
			return res.json(user);
		}
		if (type === 'routes') {
			const user = await User.findByIdAndUpdate(_id, { $push: { favouriteRoutes: id } }, { new: true });
			req.session.currentUser = user;
			return res.json(user);
		}
		const user = await User.findByIdAndUpdate(_id, { $push: { favouriteLocations: id } }, { new: true });
		req.session.currentUser = user;
		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
