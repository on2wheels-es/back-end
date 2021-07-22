const express = require('express');

const router = express.Router();
const Municipality = require('../models/Municipality');
const url = require('url');
const querystring = require('querystring')

router.get('/search', async (req, res, next) => {
	try {
		const { location } = req.query;
		const municipality = await Municipality.find({ ccaa: location }).limit(6);
		res.json(municipality);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
