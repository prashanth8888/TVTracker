describe('HomeCtrl', function(){
  var $controller;
  var $scope, result;
  var Series, $q, $httpBackend, homeController;
  var spy;
  
  var API = 'http://tv/shows/';
  
  beforeEach(module('MyApp'));

  
  var emptyPromise = function() {
            var deferred = $q.defer();
            return deferred.promise;
  }

  var Series = {
            displaybyGenre: emptyPromise
        };
        
    
  module(function ($provide) {
      $provide.value('Series', Series);
    });

  

  
  beforeEach(function(){
    inject(function(_$controller_, _$q_, _$httpBackend_) {
      $scope         = {};
      $controller   = _$controller_;
      $q            = _$q_;
      $httpBackend  = _$httpBackend_;
      result = {};
      homeController = $controller('HomeCtrl', {$scope: $scope});
      
    });
  });
  

    
    
  it('Testing Home Control Functionality', function() {
        expect(homeController).toBeDefined();
        expect(homeController.$scope).toBeUndefined()
  });
  
  it("Tracking that the series - service was invoked", function() {
        $httpBackend.whenGET(API + "?genreId=10759").respond(200, 1);
        spyOn(Series, 'displaybyGenre').and.callThrough();
        spy = Series.displaybyGenre(10759);
        expect(Series.displaybyGenre).toHaveBeenCalled();
        expect($scope).toBeDefined();
  });
});
  


