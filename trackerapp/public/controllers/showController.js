var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$routeParams','Detail', function($scope, $routeParams, Detail) {

    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId);
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    init();
  }]);