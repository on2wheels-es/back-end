const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'Email is required,'],
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
			unique: [true, 'This email has already been registered.'],
			lowercase: true,
			trim: true,
		},
		municipality: {
			type: String,
		},
		hashedPassword: {
			type: String,
			required: [true, 'Password is required.'],
		},
		birthday: String,
		dayOfBirth: Number,
		monthOfBirth: Number,
		yearOfBirth: Number,
		gender: {
			type: String,
			enum: ['Hombre', 'Mujer', 'Otros'],
		},
		favouriteRoutes: [{ type: Number, ref: 'Routes' }],
		favouritePasses: [{ type: Number, ref: 'MountainPasses' }],
		favouriteLocations: [{ type: Number, ref: 'Municipalities' }],
		isNewUser: Boolean,
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
