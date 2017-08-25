var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$routeParams','Detail', function($scope, $routeParams, Detail) {

    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId).then(function(response){
            console.log(response);
        }, function(){
            console.log("Error while trying to build Show details page");
        });
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    init();
  }]);