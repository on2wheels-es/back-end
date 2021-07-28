const express = require('express');
const axios = require("axios");
const router = express.Router();

// eslint-disable-next-line no-unused-vars
const Municipality = require('../models/Municipality');

router.post('/search', async (req, res, next) => {
	console.log(req.body)
	const { middleDateForApiRequest, locations } = req.body;

	try {
		axios
			.get(`http://www.on2wheels.es/api/weather?${middleDateForApiRequest}&ccaa=${locations}`)
			.then(response => console.log(response));
		// const municipality = await Municipality.find({ ccaa: req.query.location }).limit(6);
		// res.json(municipality);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
