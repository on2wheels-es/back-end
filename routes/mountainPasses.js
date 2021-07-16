const express = require('express');

const router = express.Router();
const MountainPass = require('../models/MountainPass');

router.get('/', async (req, res, next) => {
	try {
		const routes = await MountainPass.find();
		res.json(routes);
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const route = await MountainPass.findById(id);
		res.json(route);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
