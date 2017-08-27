var app = angular.module('MyApp');

app.controller('ShowCtrl',['$scope','$rootScope','$routeParams','Detail','Subscription', 
function($scope,$rootScope, $routeParams, Detail, Subscription) {

    $scope.seasonsData  = {};
    $scope.currentSeason = null;
    $scope.episodesData = [];
    $scope.currentSeasonEpisodesData = {};
    $scope.currentSeasonDBdata = {};
    $scope.dataHasLoaded = false;
    
    //Get the show details from the API - Uses Detail service
    $scope.getShow = function(showId){
        Detail.displaybyShowId(showId).then(function(response){
            $scope.seasonsData = {};
            $scope.currentSeasonDBdata = {};
            $scope.episodesData.length = 0;
            for(var i = 0; i < response.data.episodesData.length; i++){
                if(i == 0)
                   $scope.currentSeason = i;
                $scope.episodesData.push(response.data.episodesData[i]);
            }
            $scope.currentSeasonEpisodesData = JSON.parse($scope.episodesData[$scope.currentSeason]);
            $scope.seasonsData = JSON.parse(response.data.seasonsData);
            $scope.currentSeasonDBdata = response.data.currentSeasonDBdata;
            
            // console.log($scope.currentSeasonDBdata);
            
            $scope.isSubscribed = function() {
                // console.log("Current User ID " + $rootScope.currentUser.data._id);
                return $scope.currentSeasonDBdata.subscribers.indexOf($rootScope.currentUser.data._id) !== -1;
            };

            $scope.subscribe = function() {
              Subscription.subscribe($scope.seasonsData.id).then(function() {
                $scope.currentSeasonDBdata.subscribers.push($rootScope.currentUser.data._id);
              });
            };

            $scope.unsubscribe = function() {
              Subscription.unsubscribe($scope.seasonsData.id).then(function() {
                var index = $scope.currentSeasonDBdata.subscribers.indexOf($rootScope.currentUser.data._id);
                $scope.currentSeasonDBdata.subscribers.splice(index, 1);
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
        // console.log($scope.currentSeasonEpisodesData);
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    init();
  }]);