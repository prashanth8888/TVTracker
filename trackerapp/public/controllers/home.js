var app = angular.module('MyApp');

app.controller('HomeCtrl',['$scope', 'getShows', function($scope, getShows) {
    
    $scope.TvSeries = [];
    $scope.dataHasLoaded = false;
    
    $scope.genres = [{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},
                    {"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},
                    {"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},
                    {"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},
                    {"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},
                    {"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},
                    {"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},
                    {"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}];
                    
    $scope.getTvSeries = function(genre_id){
      getShows.displaybyGenre(genre_id).then(function(response){
        var seriesResults = response.data.results;
        $scope.TvSeries.length = 0;
        seriesResults.forEach(function(series){
            var seriesInfo = {
                id: Number,
                name: String,
                image: String,
                overview: String
            }
            if(series.poster_path != null || series.poster_path != undefined){
                seriesInfo.id       = series.id;
                seriesInfo.name     = series.name;
                seriesInfo.image    = series.poster_path;
                seriesInfo.overview = series.overview;
                $scope.TvSeries.push(seriesInfo); 
            }
            });
            $scope.dataHasLoaded = true;
      }, function(){
        console.log("Error");
      });
      
    }
    
    var init = function () {
        $scope.getTvSeries(10759); //Default load
    };
    init();
  }]);