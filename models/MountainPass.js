const mongoose = require('mongoose');

const { Schema } = mongoose;

const mountainPassSchema = new Schema(
	{
		_id: Number,
<<<<<<< HEAD
=======
		ID: Number,
>>>>>>> 7d21095ee690fe9114dcafbda6221eba934ca5ee
		name: String,
		province: String,
		municipality: String,
		altitude: Number,
		gradient: Number,
		distance: Number,
		mountain_slope: Number,
		technical_difficulty: Number,
		url: String,
<<<<<<< HEAD
=======
		photo: String,
>>>>>>> 7d21095ee690fe9114dcafbda6221eba934ca5ee
		peak_coords: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: Array,
		},
<<<<<<< HEAD
		photo: String,
=======
>>>>>>> 7d21095ee690fe9114dcafbda6221eba934ca5ee
	},
	{ timestamps: true, collection: 'mountainPasses' }
);

const MountainPass = mongoose.model('MountainPasses', mountainPassSchema);

module.exports = MountainPass;
