(function () {
angular.module('MyApp').service('Series', ['$http', function($http) {
    this.displaybyGenre = function(genreId){
        return $http.get('/tv/shows', {params: { genreId: genreId }});
    }
}]);
})();