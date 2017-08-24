var app = angular.module('MyApp');

app.service('getShows', ['$http', function($http) {
    this.displaybyGenre = function(genreId){
        // console.log("Here 2 " + genreId);
          return {
            async: function() {
              return $http.get('/tv/shows', {params: { genreId: genreId }});
            }
          };
    }
}]);
