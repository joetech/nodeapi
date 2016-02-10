var jwt = require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../config/constants');

module.exports = function(req, res, next) {
    var sessionToken = req.headers.authorization;

    if (!req.body.user && sessionToken) {
        // jwt check
        jwt.verify(sessionToken, constants.JWT_SECRET, function(err, decodedId) {
            if (decodedId) {
                User.findOne({_id: decodedId}).then(function (user) {
                    req['user'] = user;
                    next();
                }, function (err) {
                    res.send(401, 'not authorized');
                });
            } else {
                res.send(401, 'not authorized');
            }
        });
    } else {
        // continue processing
        next();
    }
};
