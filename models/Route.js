const mongoose = require('mongoose');

const { Schema } = mongoose;

const routesSchema = new Schema(
	{
		_id: Number,
		ID: Number,
		name: String,
		ccaa: String,
		province: String,
		start: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
		midpoint: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
		trailrank: Number,
		distance: Number,
		gradient: Number,
		min_alt: Number,
		max_alt: Number,
		municipality: String,
		url: String,
		mountain_passes_ids: [{ type: Number, ref: 'MountainPasses' }],
		municipalities_ids: [{ type: Number, ref: 'Municipalities' }],
		coordinates: {
			type: {
				type: String,
				default: 'LineString',
			},
			coordinates: Array,
		},
		alt: [Number],
	},
	{ timestamps: true, collection: 'routes' }
);

const Routes = mongoose.model('Routes', routesSchema);

module.exports = Routes;
