const express = require('express');

const router = express.Router();
const MountainPass = require('../models/MountainPass');
const Route = require('../models/Route');
const Municipality = require('../models/Municipality');

router.get('/', async (req, res, next) => {
	try {
		const mountainPasses = await MountainPass.find();
		res.json(mountainPasses);
	} catch (e) {
		next(e);
	}
});

router.get('/popular', async (req, res, next) => {
	try {
		const mountainPasses = await MountainPass.aggregate([{ $sample: { size: 8 } }]);
		res.json(mountainPasses);
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;

	try {
		const mountainPass = await MountainPass.findById(id);

		const routes = await Route.find({ mountain_passes_ids: { $in: [id] } });

		const municipalities = await Municipality.find({ mountain_passes_ids: { $in: [id] } });
		const uniqueMunicipalities = Array.from(new Set(municipalities)); // removes possible duplicates in the muncicipalities array

		res.json({ mountainPass, routes, uniqueMunicipalities });
	} catch (e) {
		next(e);
	}
});

module.exports = router;
