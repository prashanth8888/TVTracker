var express      = require('express');
var path         = require('path');
var async        = require('async');
var request      = require('request');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var app          = express();

var Series         = require("./public/models/series");
var User           = require("./public/models/user");

var TMDBKey        = "6bf903d885f2348c1ed94952f526a12d";

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes

//Get TV shows by Genre


app.get('/tv/shows', function(req, res, next) {
  var data;
  async.series([
       function(callback){
         var url = 'http://api.themoviedb.org/3/discover/tv?' + 'api_key=' + TMDBKey + '&sort_by=popularity.desc&with_genres=' + req.query.genreId;
         request({ url: url }, function(error, response, body) {
            data = body;
            callback();
         });
       }    
    ], function(){
            res.send(data);
       });
});


//Get TV show by ShowID

app.get('/tv/show', function(req, res, next){
  var seasonsData;
  var EpisodeDetails = [];
  var episodeDataForRetrieval;
  var url = "https://api.themoviedb.org/3/tv/"+ req.query.showID +"?api_key=" + TMDBKey + "&language=en-US";
  async.waterfall([
    
        function(callback){
            request({ url: url }, function(error, response, body) {
            seasonsData = body;
            var data = body;
            console.log(body["number_of_seasons"]);
            console.log(data.seasons);
            callback(null, episodeDataForRetrieval);
         })         
        },
        
        function(episodeDataForRetrieval, callback){
           var episodesData = [];
           console.log("Generated URLs" + episodeDataForRetrieval);
           for(var i = 0; i < episodeDataForRetrieval; i++){
             var url = "https://api.themoviedb.org/3/tv/"+ req.query.showID +"/season/"+i+"?api_key=" + TMDBKey + "&language=en-US";
             console.log(url); 
           }
           callback();
        }
    ],function() {
        res.send(seasonsData);
    });
});

app.get('*', function(req, res) {
  console.log(req.originalUrl);
  res.redirect("/#!" +req.originalUrl);
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});