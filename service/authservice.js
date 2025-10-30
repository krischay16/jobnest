const model = require('../model/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = 'Arunisnoob';

// Login: find jobseeker by email and verify password, return JWT token
module.exports.login = async (email, password) => {
	if (!email || !password) {
		const err = new Error('Email and password are required');
		err.status = 400;
		throw err;
	}

	// model.getJobseeker should return a single user (findOne). If it still
	// returns an array, the model layer should be updated — handle both here.
	const result = await model.getJobseeker(email);
	const user = Array.isArray(result) ? result[0] : result;
	if(user){
		const saltRounds=10;
		const salt=await bcrypt.genSalt(saltRounds);
		const hashedPassword=await bcrypt.hash(user.password,salt);
		user.password=hashedPassword;
	}
	if (!user) {
		const err = new Error('Invalid credentials');
		err.status = 401;
		throw err;
	}

	const valid = await bcrypt.compare(password, user.password || '');
	if (!valid) {
		const err = new Error('Invalid credentials');
		err.status = 401;
		throw err;
	}

	const token = jwt.sign({ id: user._id || user.id, email: user.email }, secret, {
		expiresIn: '24h',
	});

	return token;
};
