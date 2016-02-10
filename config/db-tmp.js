var db = require('mongoose');

db.connect('mongodb://');


module.exports = db;
