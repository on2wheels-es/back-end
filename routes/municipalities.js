const express = require('express');

const router = express.Router();
const Municipality = require('../models/Municipality');

router.get('/', async (req, res, next) => {
	try {
		const routes = await Municipality.find();
		res.json(routes);
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const route = await Municipality.findById(id);
		res.json(route);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
