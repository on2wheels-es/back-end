const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Name·is·required.'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required.'],
		},
		email: {
			type: String,
			required: [true, 'Email is required,'],
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
			unique: [true, 'This email has already been registered.'],
			lowercase: true,
			trim: true,
		},
		hashedPassword: {
			type: String,
			required: [true, 'Password is required.'],
		},
		favouriteRoutes: [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
		favouritePasses: [{ type: Schema.Types.ObjectId, ref: 'MountainPasses' }],
		favouriteLocations: [{ type: Schema.Types.ObjectId, ref: 'Locations' }],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
