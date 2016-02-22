var router = require('express').Router();
var Log = require('../models/log');

// get all logs by user
router.get('/', function(req, res) {
    Log.find({ owner: req.user }).then( function(logs) {
        res.json(logs);
    });
});

// get all logs by definition
// /api/logs/byDef
router.get('/byDef', function(req, res) {
    Log.find({ owner: req.user, definition: req.body.definition }).then( function(logs) {
        res.json(logs);
    });
});

router.post('/', function(req, res) {
    var log = new Log({
        description: req.body.log.description,
        result: req.body.log.result,
        date: req.body.log.date,
        owner: req.user,
        definition: req.body.definition
    });

    log.save().then( function(log) {
        res.json({
            message: 'saved',
            log: log
        });
    });
});

router.put('/:id', function(req, res) {
    Log.findOne({ _id: req.params.id, owner: req.user }).then(function(log) {
        log.result = req.body.log.result;
        log.description = req.body.log.description;
        log.date = req.body.log.date;
        log.definition = req.body.log.definition;
    });

    log.save().then( function(log) {
        res.json({
            message: 'updated',
            log: log
        });
    });
});

router.delete('/:id', function(req, res) {
    Log.findOne({ _id: req.params.id, owner: req.user }).then(function(log) {
        log.remove().then(function() {
            res.json({
                message: 'deleted',
                log: log
            });
        });
    });
});