(function () {

angular.module('MyApp').service('Detail', ['$http', function($http) {
    this.displaybyShowId = function(showId){
        return $http.get('/tv/show/', {params: { showID: showId }});
    }
}]);
})();
