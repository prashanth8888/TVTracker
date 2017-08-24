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

//Enables Angular Rerouting


app.get('/tv/shows', function(req, res, next) {
  var data;
  // console.log("Here" + JSON.stringify(req.params.data) + JSON.stringify(req.body) + JSON.stringify(req.query.genreId));
  async.series([
       function(callback){
         var url = 'http://api.themoviedb.org/3/discover/tv?' + 'api_key=' + TMDBKey + '&sort_by=popularity.desc&with_genres=' + req.query.genreId;
         console.log(url);
         request({ url: url }, function(error, response, body) {
            // console.log(error);
            // console.log(response);
            console.log(body);
            data = body;
         });
       }    
    ], function(){
            res.send(data);
       });
});

app.get('*', function(req, res) {
  console.log(req.originalUrl);
  res.redirect("/#!" +req.originalUrl);
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});