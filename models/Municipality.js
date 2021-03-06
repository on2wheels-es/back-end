const mongoose = require('mongoose');

const { Schema } = mongoose;

const municipalitySchema = new Schema(
	{
		_id: Number,
		municipality: String,
		ccaa: String,
		province: String,
		municipality_inhabitants: Number,
		geographic_area: Number,
		radius: Number,
		routes_number: Number,
		routes_ids: [{ type: Number, ref: 'Routes' }],
		mountain_passes_ids: [{ type: Number, ref: 'MountainPasses' }],
		python_coords: String,
		coords: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
	},
	{ timestamps: true, collection: 'municipalities' }
);

const Municipalities = mongoose.model('Municipalities', municipalitySchema);

module.exports = Municipalities;
