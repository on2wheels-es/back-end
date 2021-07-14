const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		province: String,
		municipality: String,
		municipality_original_name: String,
		municipality_inhabitants: Number,
		geographic_area: Number,
		radius: Number,
		routes_number: Number,
		routes_ids: [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
		mountainPasses_ids: [{ type: Schema.Types.ObjectId, ref: 'MountainPass' }],
		geolocation: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
	},
	{ timestamps: true }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
