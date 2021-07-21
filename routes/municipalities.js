const express = require('express');

const router = express.Router();
const Municipality = require('../models/Municipality');

router.get('/', async (req, res, next) => {
	try {
		const municipality = await Municipality.find();
		res.json(municipality);
	} catch (e) {
		next(e);
	}
});

router.get('/popular', async (req, res, next) => {
	try {
		const municipality = await Municipality.aggregate([{ $sample: { size: 8 } }]);
		res.json(municipality);
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const municipality = await Municipality.findById(id)
			.populate('routes_ids')
			.populate({
				path: 'routes_ids',
				populate: { path: 'mountain_passes_ids' },
			});
		res.json(municipality);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
