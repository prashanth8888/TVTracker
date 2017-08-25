var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$routeParams','Detail', function($scope, $routeParams, Detail) {

    $scope.seasonsData  = {};
    $scope.currentSeason = null;
    $scope.episodesData = [];
    $scope.currentSeasonEpisodesData = {};
    
    
    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId).then(function(response){
            $scope.seasonsData = {};
            $scope.episodesData.length = 0;
            for(var i = 0; i < response.data.episodesData.length; i++){
                if(i == 0)
                   $scope.currentSeason = i;
                $scope.episodesData.push(response.data.episodesData[i]);
            }
            $scope.currentSeasonEpisodesData = $scope.episodesData[$scope.currentSeason];
            $scope.seasonsData = response.data.seasonsData;
            console.log($scope.seasonsData);
        }, function(){
            console.log("Error while trying to build Show details page");
        });
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    init();
  }]);