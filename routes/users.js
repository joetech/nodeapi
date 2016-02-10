var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');

router.post('/', (req, res) => {
    // Example payload:
    // user = {username: 'foo', email: 'test@example.com', pwd: 'blah'}
    // bcrypt hashes 10 times

    // Let's build the user object
    var user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        passhash: bcrypt.hashSync(req.body.user.pwd, 10)
    });

    // Store the user to the mongo db
    // ... and use callback functions on completion or error
    user.save().then(
        (newuser) => {
	    // Do something on success
            // Let's send a json response back with the user.
            res.json({
              user: newuser,
              message: 'success'
            });
        },
        (err) => {
	    // Do something on error
            // Send back an error with 500
            res.send(500, err.message);
        }
    );
});

module.exports = router;
