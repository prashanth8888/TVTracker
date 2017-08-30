describe('HomeCtrl', function(){
  var $controller;
  var scope;
  var $httpBackend;
  var results = {"page":1,"total_results":2481,"total_pages":125,"results":[{"original_name":"Alias","genre_ids":[18,10759],"name":"Alias","popularity":78.745886,"origin_country":["US"],"vote_count":119,"first_air_date":"2001-09-30","backdrop_path":"/uqu5SuPIr0VQPqXF7CuGY3j2431.jpg","original_language":"en","id":2046,"vote_average":6.4,"overview":"Sydney Bristow, an agent who has been tricked to believe she is working for the U.S. government, is actually working for a criminal organization named the Alliance of Twelve. Upon learning this, Sydney becomes a double agent for the real CIA.","poster_path":"/bMj6iM7TBcceG44vpireA2Axeab.jpg"}]};
  
  
  var API = '/tv/shows?genreId=10759';
  
  beforeEach(module('MyApp'));

  
  beforeEach(function(){
    inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
      scope        = _$rootScope_.$new();
      $controller   = _$controller_;
      $httpBackend  = _$httpBackend_;
      $httpBackend.whenGET(API).respond(results);
    });
  });
  
  afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
  });
    
  describe('Data should load successfully', function() {
        beforeEach(function() {
           $controller('HomeCtrl', { $scope: scope });
        });
        
        it('Before the data is loaded', function(){

          expect(scope.dataHasLoaded).toEqual(false);
          expect(scope.TvSeries.length).toBe(0);
        });
       
        it('after data is loaded', function() {
           scope.getTvSeries(10759);
           
           $httpBackend.flush();
           
           expect(scope.TvSeries[0].name).toEqual(results.results[0].name);
           expect(scope.dataHasLoaded).toEqual(true);
           expect(scope.TvSeries.length).not.toBe(0);
           
        });
        
  });
    
  
});
  


