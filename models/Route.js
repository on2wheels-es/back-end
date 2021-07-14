const mongoose = require('mongoose');

const { Schema } = mongoose;

const routesSchema = new Schema(
	{
		_id: { type: Schema.Types.ObjectId },
		title: String,
		description: String,
		alpha_name: String,
		location: String,
		name: String,
		trailrank: Number,
		distance: Number,
		gradient: Number,
		difficulty: String,
		wikilocRoute: String,
		photo1: String,
		photo2: String,
		photo3: String,
		start_latitude: Number,
		start_longitude: Number,
		mountainPasses_ids: [{ type: Schema.Types.ObjectId, ref: 'MountainPasses' }],
		locations_ids: [{ type: Schema.Types.ObjectId, ref: 'Locations' }],
		geolocation: {
			type: {
				type: String,
				default: 'Polygon',
			},
			coordinates: Array,
		},
	},
	{ timestamps: true }
);

const Routes = mongoose.model('Routes', routesSchema);

module.exports = Routes;
