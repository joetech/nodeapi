var db = require('../config/db.js');
var UserSchema = require('../config/user-schema');

var User = db.model('User', UserSchema);

module.exports = User;
