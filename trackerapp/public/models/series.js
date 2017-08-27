var mongoose    = require("mongoose");

var series = new mongoose.Schema({
    seriesParm : {
                 _id: Number,
                 name: String,
                 overview: String,
                 airdate: Date,
                 subscribers: [{
                        type: mongoose.Schema.Types.ObjectId, ref: 'User'
                 }]
                 }
});


module.exports = mongoose.model("Show", series);