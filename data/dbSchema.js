var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function() {

    var eventsSchema = new Schema({
        eventName:String,
        eventLocation:String,
        eventDate: Date,
        eventTime: String,
        eventDuration:Number,
        eventType: String,
        eventDescription: String,
        eventTechnology: String,
        eventImage: String,
        'eventConductedBy[]': [String],
        'eventResources[]': [String],
        vote:Boolean,
        totalVotes:Number
     });


    var gallerySchema = new Schema({
        eventName: String,
        imageBitmapUrl: [
            {url: String, height: String, width: String}
        ],
        imageUrl: [
            {url: String, height: String, width: String}
        ]
    });

    mongoose.model('Events', eventsSchema);
};