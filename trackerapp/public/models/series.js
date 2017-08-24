var mongoose    = require("mongoose");

var series = new mongoose.Schema({
    _id: Number,
    name: String,
    overview: String,
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
});


module.exports = mongoose.model("Show", series);