const express = require('express');

const router = express.Router();
const Route = require('../models/Route');
const Municipality = require('../models/Municipality');

router.get('/', async (req, res, next) => {
	try {
		const routes = await Route.find().populate('mountain_passes_ids');
		res.json(routes);
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const route = await Route.findById(id).populate('mountain_passes_ids');
		const municipalities = await Municipality.find({ routes_ids: { $in: [id] } });
		res.json({ route, municipalities });
	} catch (e) {
		next(e);
	}
});

module.exports = router;
