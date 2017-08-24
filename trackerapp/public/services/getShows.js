var app = angular.module('MyApp');

app.service('getShows', ['$http', function($http) {
    this.displaybyGenre = function(genreId){
        return $http.get('/tv/shows', {params: { genreId: genreId }});
    }
}]);
