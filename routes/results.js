const express = require('express');

const router = express.Router();
const Municipality = require('../models/Municipality');

router.get('/search', async (req, res, next) => {
	console.log(req.query)

	try {
		const municipality = await Municipality.find().limit(2);
		res.json(municipality);
	} catch (e) {
		next(e);
	}
});

module.exports = router;