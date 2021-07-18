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

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const municipality = await Municipality.findById(id);
		res.json(municipality);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
