// // // describe('MyApp', function() {

// // // var app = angular.module('MyApp');
// // // // console.log(JSON.stringify(app));

describe('HomeCtrl', function(){
  var $controller;
  var scope;
  var Series, $q, $httpBackend, homeController;
  
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
    inject(function($rootScope, _$controller_, _$q_, _$httpBackend_) {
      scope         = $rootScope.$new();
      $controller   = _$controller_;
      $q            = _$q_;
      $httpBackend  = _$httpBackend_;
      homeController = $controller('HomeCtrl', {$scope: scope});
    });
  });
    
    
  it('Testing Home Control Functionality', function() {
        expect(homeController).toBeDefined();
        expect(homeController.$scope).toBeUndefined()
  });
  
  it("Tracking that the series - service was invoked", function() {
        var spy =  spyOn(Series, 'displaybyGenre').and.callThrough();
        expect(Series).toBeDefined();
        expect(spy);
        expect(homeController.$scope).toBeUndefined();
  });
});
  


