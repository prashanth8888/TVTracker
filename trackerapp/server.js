var express       = require('express');
var path          = require('path');
var async         = require('async');
var request       = require('request');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var app           = express();
var mongoose      = require("mongoose");
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var schedule      = require('node-schedule'); 
var nodemailer    = require('nodemailer');
var compress      = require('compression')



var Series         = require("./public/models/series");
var User           = require("./public/models/user");

var TMDBKey        = "6bf903d885f2348c1ed94952f526a12d";
var oneDay         = 86400000; //In milliseconds

app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'With great power comes great responsibility' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'), {maxAge: oneDay}));


//Mongo Connection
mongoose.connect("mongodb://localhost/tvappdb1");

app.use(function(req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});


//Passport Authentication methods
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
//   console.log("Authenticating");
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));

//Custom Functions
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.send(401);
}

//Routes

//Get TV shows by Genre
app.get('/tv/shows', function(req, res, next) {
  var data;
  async.series([
       function(callback){
         var url = 'http://api.themoviedb.org/3/discover/tv?' + 'api_key=' 
         + TMDBKey + '&sort_by=popularity.desc&with_genres=' + req.query.genreId;
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
  var episodesData = [];
  var episodeDataForRetrieval;
  var currentSeasonDBdata;
  
  var url = "https://api.themoviedb.org/3/tv/"+ req.query.showID +"?api_key=" + TMDBKey + "&language=en-US";
  async.waterfall([
    
        function(callback){
            request({ url: url }, function(error, response, body) {
            seasonsData = body;
            var jsonBody = JSON.parse(body);
            Series.findOne({"seriesParm._id" : Number(jsonBody["id"])}, function(err, data){
               if(err)
                  console.log(err);
               else if(!data){
                  var latestSeasonPointer = jsonBody["seasons"].length - 1;
                  var seriesInfo = {
                      _id:          Number(jsonBody["id"]),
                      name:         jsonBody["name"],
                      overview:     jsonBody["overview"],
                      airdate:      jsonBody.seasons[latestSeasonPointer].air_date,
                      subscribers : []
                  };
                  Series.create({seriesParm : seriesInfo}, function(err, newSeries){
                      if(err)
                        console.log(err);
                      else{
                          newSeries.save();
                          currentSeasonDBdata = newSeries;
                      }
                  });
               }
               else{
                    currentSeasonDBdata = data;
               }
            });
            episodeDataForRetrieval = jsonBody["number_of_seasons"];
            callback(null, episodeDataForRetrieval);
         });         
        },
        
        function(episodeDataForRetrieval, callback){
          var generatedUrls = [];
           for(var i = 0; i < episodeDataForRetrieval; i++){
             var url = "https://api.themoviedb.org/3/tv/"+ req.query.showID +"/season/"+i+"?api_key=" + TMDBKey + "&language=en-US";
             generatedUrls.push(url);
           }  
          async.eachSeries(generatedUrls, function(url, callback){
              request({ url: url }, function(error, response, body) {
                    episodesData.push(body);
                    callback();
              });
          }, function(){
              callback(); //Outer callback
          });
        }
    ],function() {
        res.send({seasonsData: seasonsData, episodesData: episodesData, 
                  currentSeasonDBdata: currentSeasonDBdata.seriesParm});
    });
});

//Login and Signup Routes

app.post('/tvApp/login', passport.authenticate('local'), function(req, res) {
  res.cookie('user', req.user);
  res.send(req.user);
});

app.post('/tvApp/signup', function(req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    if (err) {
        console.log("Error in saving data");
        return next(err);
    }
    res.send(200);
  });
});

app.get('/tvApp/logout', function(req, res, next) {
  req.logout();
  res.send(200);
});

//SubScribe and Unsubscribe Routes

app.post('/tv/subscribe', ensureAuthenticated, function(req, res, next) {
    var showID = Number(JSON.stringify(req.body.params.showID));
    Series.findOne({"seriesParm._id" : showID}, function(err, series) {
    if (err) return next(err);
    series.seriesParm.subscribers.push(req.user.id);
    series.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
});

app.post('/tv/unsubscribe', ensureAuthenticated, function(req, res, next) {
    var showID = Number(JSON.stringify(req.body.params.showID));
    Series.findOne({"seriesParm._id" : showID}, function(err, series) {
    if (err) return next(err);
    var index = series.seriesParm.subscribers.indexOf(req.user.id);
    series.seriesParm.subscribers.splice(index, 1);
    series.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
});


schedule.scheduleJob({hour: 00, minute: 00}, function(){
    Series.find({"seriesParm.airdate": { $gt : new Date("Jan 01, 2017") }}).populate('seriesParm.subscribers').exec(function(err, show){
        if(err)
          console.log(err);
        else{
          
          var elgibleShowDetails = show;
          for(var i = 0; i < elgibleShowDetails.length; i++){
              var emails = elgibleShowDetails[i].seriesParm.subscribers.map(function(user) {
                    return user.email;
              });
              console.log(emails);
              
              var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'tvshowtracker11@gmail.com', 
                      pass: 'trackmyshow' }
              });
              
              if(emails.length > 0){
                var mailOptions = {
                  from: 'TVShowTracker <tvshowtracker11@gmail.com>',
                  to: emails.join(','),
                  subject: elgibleShowDetails[i].seriesParm.name + ' is resuming this year!',
                  text: "The series " + elgibleShowDetails[i].seriesParm.name + " is back and mark the date " + elgibleShowDetails[i].seriesParm.airdate.toISOString().substring(0, 10) + " to catch up! - Happy TV watching!"
              };
              
              smtpTransport.sendMail(mailOptions, function(error, response) {
                  smtpTransport.close();
              });
              
             }
          }
        }
    });
});

app.get('*', function(req, res) {
  console.log(req.originalUrl);
  res.redirect("/#!" +req.originalUrl);
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});