const express = require('express');

const router = express.Router();
const MountainPass = require('../models/MountainPass');

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
		res.json(mountainPass);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
