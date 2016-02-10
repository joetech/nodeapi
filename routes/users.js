var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');

router.post('/', function(req, res) {
    // Example payload:
    // {
    //     "user":
    //     {
    //         "username": "foo",
    //         "email": "test@example.com",
    //         "pwd": "blah"
    //     }
    // }
    //
    // bcrypt hashes 10 times

    // Let's build the user object
    console.log(req.body);
    var user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        passhash: bcrypt.hashSync(req.body.user.pwd, 10)
    });

    // Store the user to the mongo db
    // ... and use callback functions on completion or error
    user.save().then(
        function(newuser) {
	        // Sign the session token - expire in 1 hour
            var sessionToken = jwt.sign(newuser._id, constants.JWT_SECRET, { expiresIn: 60*60 });

            // Let's send a json response back with the user.
            res.json({
                user_id: newuser._id,
                message: 'success',
                sessionToken: sessionToken
            });
        },
        function (err) {
	    // Do something on error
            // Send back an error with 500
            res.send(500, err.message);
        }
    );
});

module.exports = router;
