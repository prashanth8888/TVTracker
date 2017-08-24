var app = angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap']);

app.config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
     
     $locationProvider.html5Mode(true);
     
     $routeProvider
     .when('/', {
         templateUrl: "views/home.html",
         controller: 'HomeCtrl'
     })
     .when('/shows/:id', {
         templateUrl: "views/show.html",
         controller: 'ShowCtrl'
     })
     .when('/signup', {
         templateUrl: "views/signup.html",
         controller: 'SignupCtrl'
     })
     .when('/login', {
         templateUrl: "views/login.html",
         controller: 'LoginCtrl'
     })
     .otherwise({
         redirectTo: '/'
     });
     
  }]);