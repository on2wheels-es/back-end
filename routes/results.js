const express = require('express');
const axios = require('axios');

const router = express.Router();

const Municipality = require('../models/Municipality');

router.post('/search', (req, res, next) => {
	const { middleDateForApiRequest, idsForApiRequest } = req.body;

	axios
		.get(`http://www.on2wheels.es/api/weather?${middleDateForApiRequest}&ccaa=${idsForApiRequest}`)
		.then(response => {
			const { destination } = response.data;

			Municipality.find({ _id: { $in: destination } })
				.then(municipalities => {
					res.json(municipalities);
				})
				.catch(error => next(error));
		});
});

module.exports = router;
