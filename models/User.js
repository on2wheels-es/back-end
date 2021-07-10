const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		hashedPassword: { type: String, required: true },
		favouriteRoutes: [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
		favouritePasses: [{ type: Schema.Types.ObjectId, ref: 'MountainPasses' }],
		favouriteLocations: [{ type: Schema.Types.ObjectId, ref: 'Locations' }],
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
