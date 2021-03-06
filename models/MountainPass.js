const mongoose = require('mongoose');

const { Schema } = mongoose;

const mountainPassSchema = new Schema(
	{
		_id: Number,
		name: String,
		province: String,
		municipality: String,
		altitude: Number,
		gradient: Number,
		distance: Number,
		mountain_slope: Number,
		technical_difficulty: Number,
		url: String,
		peak_coords: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
		photo: String,
	},
	{ timestamps: true, collection: 'mountainPasses' }
);

const MountainPass = mongoose.model('MountainPasses', mountainPassSchema);

module.exports = MountainPass;
