var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');

var router = express.Router();
var User = require('../models/user');

router.post('/register', function(req, res) {
	User.create({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password
	},
		function (err, user) {
			if (err) return res.status(500).send({ message: "Already registered username or email address." })
			// create a token
			var token = jwt.sign({ id: user._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).json({ auth: true, token: token });
		});
});

router.post('/login', function(req, res) {
	User.auth({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password
	},
		function (err, user) {
			if (err) return res.status(500).send({ message: "Authentication failed." })
			// create a token
			var token = jwt.sign({ id: user._id }, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).json({ auth: true, token: token });
		});
});

router.get('/me', function(req, res) {
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send(decoded);
	});
});

module.exports = router;
