const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.patch('/addToFavourites/:id/:type', async (req, res, next) => {
	const { id, type } = req.params;
	const { userID } = req.body;

	try {
		if (type === 'mountainPasses') {
			const user = await User.findByIdAndUpdate(userID, { $push: { favouritePasses: id } }, { new: true });
			return res.json(user);
		}
		if (type === 'routes') {
			const user = await User.findByIdAndUpdate(userID, { $push: { favouriteRoutes: id } }, { new: true });
			return res.json(user);
		}
		const user = await User.findByIdAndUpdate(userID, { $push: { favouriteLocations: id } }, { new: true });
		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

router.post('/checkIfFav', async (req, res, next) => {
	const { id, type, userID } = req.body;
	try {
		if (type === 'mountainPasses') {
			const user = await User.findById(userID);
			if (user.favouritePasses.includes(id)) {
				return res.json({ isFavourited: true });
			}
			return res.json({ isFavourited: false });
		}
		if (type === 'routes') {
			const user = await User.findById(userID);
			if (user.favouriteRoutes.includes(id)) {
				return res.json({ isFavourited: true });
			}
			return res.json({ isFavourited: false });
		}
		const user = await User.findById(userID);
		if (user.favouriteLocations.includes(id)) {
			return res.json({ isFavourited: true });
		}
		return res.json({ isFavourited: false });
	} catch (error) {
		return next(error);
	}
});

router.patch('/removeFromFavourites/:id/:type', async (req, res, next) => {
	const { id, type } = req.params;
	const { userID } = req.body;

	try {
		if (type === 'mountainPasses') {
			const user = await User.findByIdAndUpdate(userID, { $pull: { favouritePasses: id } }, { new: true });
			return res.json(user);
		}
		if (type === 'routes') {
			const user = await User.findByIdAndUpdate(userID, { $pull: { favouriteRoutes: id } }, { new: true });
			return res.json(user);
		}
		const user = await User.findByIdAndUpdate(userID, { $pull: { favouriteLocations: id } }, { new: true });
		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
