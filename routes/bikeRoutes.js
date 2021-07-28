const express = require('express');

const gpxParser = require('gpxparser');
const request = require('request');

const router = express.Router();
const Route = require('../models/Route');
const Municipality = require('../models/Municipality');

router.get('/', async (req, res, next) => {
	try {
		const routes = await Route.find().populate('mountain_passes_ids').populate('municipalities');
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

router.post('/drawBikeRoute', async (req, res, next) => {
	const { gpxFile } = req.body;

	try {
		await request.get(gpxFile, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				const file = body;

				const gpx = new gpxParser(); // Create gpxParser Object
				gpx.parse(file); // parse gpx file from string data

				const geoJSON = gpx.toGeoJSON();
				return res.json(geoJSON);
			}
		});
	} catch (e) {
		next(e);
	}
});

module.exports = router;
