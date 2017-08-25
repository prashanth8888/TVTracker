var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$routeParams','Detail', function($scope, $routeParams, Detail) {

    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId).then(function(response){
            console.log("Sesons Data " + response.data.seasonsData);
            console.log("Episodes Data " + response.data.episodesData);
        }, function(){
            console.log("Error while trying to build Show details page");
        });
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    init();
  }]);