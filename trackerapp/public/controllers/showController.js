(function () {

angular.module('MyApp').controller('ShowCtrl',['$scope','$rootScope','$routeParams','Detail','Subscription', 
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
            $scope.seasonToDisplayIdentified = false;
            
            for(var i = 0; i < response.data.episodesData.length; i++){
                    try{
                        //Sometimes we are getting invalid response from the API - Need to filter out all the invalid data.
                        var tempdata = JSON.parse(response.data.episodesData[i]);
                        if(!$scope.seasonToDisplayIdentified){
                            $scope.currentSeason = i;
                            $scope.seasonToDisplayIdentified = true;
                        }
                        $scope.episodesData.push(tempdata);
                        
                    }catch(e){
                        continue;
                        //Skip the episodes data
                    }
            }
            
            $scope.currentSeasonEpisodesData = $scope.episodesData[$scope.currentSeason];
            $scope.seasonsData               = JSON.parse(response.data.seasonsData);
            $scope.currentSeasonDBdata       = response.data.currentSeasonDBdata;
            
            
            $scope.isSubscribed = function() {
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
        
        }, function(error){
            console.log("Error while trying to build Show details page" + error);
        });
    }
    
    //Switching between different seasons
    $scope.getSeason = function(seasonID){
        $scope.currentSeason = seasonID;
        $scope.currentSeasonEpisodesData = $scope.episodesData[$scope.currentSeason];
    }
    
    var init = function () {
       $scope.getShow($routeParams.id);
    };
    
    init();
    
  }]);
})();