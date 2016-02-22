var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');
var User = require('../models/user');

router.post('/', function(req, res) {
    User.findOne({username: req.body.user.username}).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.pwd, user.passhash, function (err, matches) {
                    if (matches) {
                        var sessionToken = jwt.sign({ "_id": user._id }, constants.JWT_SECRET, {expiresIn: 24 * 60 * 60});
                        res.json({
                            user: user,
                            message: 'success',
                            sessionToken: sessionToken
                        });
                    } else {
                        res.json({
                            user: {},
                            message: 'failed',
                            sessionToken: ''
                        });
                    }
                });
            } else {
                res.json({
                    user: {},
                    message: 'fail',
                    sessionToken: ''
                });
            }
        },
        function(err) {
            // could not find user
            res.json(err);
        }
    );
});

module.exports = router;