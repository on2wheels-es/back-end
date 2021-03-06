const express = require('express');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const { checkUsernameAndPasswordNotEmpty } = require('../middlewares');

const User = require('../models/User');

const bcryptSalt = 10;

const router = express.Router();

router.get('/whoami', async (req, res, next) => {
	if (req.session.currentUser) {
		// eslint-disable-next-line no-underscore-dangle
		const user = await User.findById(req.session.currentUser._id);
		req.session.currentUser = user;
		res.status(200).json(user);
	} else {
		next(createError(401));
	}
});

router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { email, password } = res.locals.auth;
	try {
		if (!email || !password) {
			return next(createError(422));
		}

		const user = await User.findOne({ email });
		if (user) {
			return next(createError(409));
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await User.create({ email, hashedPassword, isNewUser: true });
		req.session.currentUser = newUser;
		return res.json(newUser);
	} catch (error) {
		return next(error);
	}
});

router.patch('/update-profile', async (req, res, next) => {
	const { _id } = req.session.currentUser;
	const key = Object.keys(req.body);
	const updatesFields = {};

	for (let i = 0; i < key.length; i += 1) {
		updatesFields[key[i]] = Object.values(req.body)[i];
	}

	try {
		const user = await User.findByIdAndUpdate(
			_id,
			{
				$set: updatesFields,
			},
			{
				new: true,
			}
		);
		req.session.currentUser = user;
		return res.json(user);
	} catch (error) {
		return next(error);
	}
});

router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { email, password } = res.locals.auth;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(createError(404));
		}
		if (bcrypt.compareSync(password, user.hashedPassword)) {
			req.session.currentUser = user;
			return res.json(user);
		}
		return next(createError(404));
	} catch (error) {
		return next(error);
	}
});

router.post('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}

		return res.status(204).send();
	});
});

module.exports = router;
