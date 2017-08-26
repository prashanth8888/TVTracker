var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$routeParams','Detail', function($scope, $routeParams, Detail) {

    $scope.seasonsData  = {};
    $scope.currentSeason = null;
    $scope.episodesData = [];
    $scope.currentSeasonEpisodesData = {};
    $scope.dataHasLoaded = false;
    
    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId).then(function(response){
            $scope.seasonsData = {};
            $scope.episodesData.length = 0;
            for(var i = 0; i < response.data.episodesData.length; i++){
                if(i == 0)
                   $scope.currentSeason = i;
                $scope.episodesData.push(response.data.episodesData[i]);
            }
            $scope.currentSeasonEpisodesData = JSON.parse($scope.episodesData[$scope.currentSeason]);
            $scope.seasonsData = JSON.parse(response.data.seasonsData);
            // console.log($scope.currentSeasonEpisodesData.episodes);
            $scope.dataHasLoaded = true;
        }, function(){
            console.log("Error while trying to build Show details page");
        });
    }
    
    $scope.getSeason = function(seasonID){
        $scope.currentSeason = seasonID;
        $scope.currentSeasonEpisodesData = JSON.parse($scope.episodesData[$scope.currentSeason]);
        console.log($scope.currentSeasonEpisodesData);
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    init();
  }]);