var app = angular.module('MyApp');

app.controller('HomeCtrl', ['$scope', 'Show', function($scope, Show) {

    $scope.genres = ['Action', 'Adventure', 'Animation','Comedy', 'Thriller' ,
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror',
      'Mystery', 'News', 'Reality', 'Romance', 'Sci-Fi', 'Suspense'];

    $scope.shows = Show.query();

    $scope.filterByGenre = function(genre) {
      $scope.shows = Show.query({ genre: genre });
      $scope.headingTitle = genre;
    };

  }]);