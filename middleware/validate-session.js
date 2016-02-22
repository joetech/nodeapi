var jwt = require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../config/constants');

module.exports = function(req, res, next) {
    var sessionToken = req.headers.authorization;

    if (!req.body.user && sessionToken) {
        // jwt check
        jwt.verify(sessionToken, constants.JWT_SECRET, function(err, decodedId) {
            if (decodedId) {
                User.findOne({ _id: decodedId}).then(function(user) {
                    req['user'] = user;
                    next();
                }, function (err) {
                    res.status(401).send('not authorized user');
                });
            } else {
                res.status(401).send('not authorized');
            }
        });
    } else {
        // continue processing without checking a session
        // This feels wrong.  If we don't supply a user or sessionToken, we just let them through?
        next();
    }
};
