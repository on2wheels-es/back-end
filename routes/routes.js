const express = require('express');

const router = express.Router();
const Route = require('../models/Route');

router.get('/', async (req, res, next) => {
	try {
		const routes = await Route.findById(36).populate('puertos');
		res.json(routes);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
