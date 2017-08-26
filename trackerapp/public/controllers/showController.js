var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$rootScope','$routeParams','Detail', 
function($scope,$rootScope, $routeParams, Detail) {

    $scope.seasonsData  = {};
    $scope.currentSeason = null;
    $scope.episodesData = [];
    $scope.currentSeasonEpisodesData = {};
    $scope.currentEpisodeDBdata = {};
    $scope.dataHasLoaded = false;
    
    //Get the show details from the API - Uses Detail service
    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId).then(function(response){
            $scope.seasonsData = {};
            $scope.currentEpisodeDBdata = {};
            $scope.episodesData.length = 0;
            for(var i = 0; i < response.data.episodesData.length; i++){
                if(i == 0)
                   $scope.currentSeason = i;
                $scope.episodesData.push(response.data.episodesData[i]);
            }
            $scope.currentSeasonEpisodesData = JSON.parse($scope.episodesData[$scope.currentSeason]);
            $scope.seasonsData = JSON.parse(response.data.seasonsData);
            $scope.currentEpisodeDBdata = JSON.parse(response.data.DBdata);
            
            
            
            $scope.isSubscribed = function() {
                return $scope.currentEpisodeDBdata.subscribers.indexOf($rootScope.currentUser._id) !== -1;
            };

            $scope.subscribe = function() {
              Subscription.subscribe($scope.seasonsData).success(function() {
                $scope.currentEpisodeDBdata.subscribers.push($rootScope.currentUser._id);
              });
            };

            $scope.unsubscribe = function() {
              Subscription.unsubscribe($scope.seasonsData.id).success(function() {
                var index = $scope.show.subscribers.indexOf($rootScope.currentUser._id);
                $scope.currentEpisodeDBdata.subscribers.splice(index, 1);
              });
            };
            
            $scope.dataHasLoaded = true;
        
        }, function(){
            console.log("Error while trying to build Show details page");
        });
    }
    
    //Switching between different seasons
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