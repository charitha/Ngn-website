var express = require('express');
var router = express.Router();
var winston = require('winston');
var logger = new winston.Logger();
var mongoose = require('mongoose');
require('../data/dbSchema.js')();
var busboy = require('connect-busboy');
var fs = require('fs-extra');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



router.get('/home', function(req, res) {
    res.render('index', { title: 'kate' });
});

router.get('/events', function(req, res) {
    var events = mongoose.model('Events');
    var currentDate = new Date();
    var endDate = new Date(+new Date + 12096e5);

    res.header('Access-Control-Allow-Origin','*');


    events.find({eventDate:{$gte:currentDate,$lt:endDate}}).exec(function(err,items){
        res.json(items);
        if(err != null){
          //handle error
        }

    });
});

router.get('/upcoming',function(req, res){
    var events = mongoose.model('Events');

    var fortnightFromCurrentDate = new Date(+new Date + 12096e5);
    console.log(fortnightFromCurrentDate);

    events.find({eventDate:{$gt:fortnightFromCurrentDate}}).exec(function(err,items){
        res.json(items);
        if(err != null){
            //handle error
        }

    });

    });

/* Admin Login */
router.get('/admin', function(req, res) {

    res.render('createEvent');


});

router.post('/admin',function(req, res){

    console.log(req.body);
    var events = mongoose.model('Events');
    
    var eventObj = new events(req.body);
    eventObj.save(function(err) {

        if (err != null) {
         console.log(err);
         console.log(err.message);
        }
        else{
            res.json('Your submission has been recorded');
        }

    })



});

router.post('/events', function(req, res, next) {
    var events = mongoose.model('Events');

    console.log(req.body);

    var eventObj = new events(req.body);
    eventObj.save(function(err) {

        if (err != null) {

        }
        else{
          res.json('success');
        }

    })


});

router.get('/gallery', function(req, res) {

 });

module.exports = router;
