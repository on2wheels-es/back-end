const mongoose = require('mongoose');

const { Schema } = mongoose;

const mountainPassSchema = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		name: String,
		province: String,
		municipality: String,
		altitude: Number,
		gradient: Number,
		distance: Number,
		mountain_slope: Number,
		coefficient: Number,
		url: String,
		photo: String,
		geolocation: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
		routes_ids: [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
		locations_ids: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
	},
	{ timestamps: true }
);

const MountainPass = mongoose.model('MountainPass', mountainPassSchema);

module.exports = MountainPass;
