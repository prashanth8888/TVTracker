(function () {
angular.module('MyApp')
  .factory('Subscription', ['$http', function($http) {
    return {
      subscribe: function(showID) {
        return $http.post('/tv/subscribe', {params: { showID : showID }});
      },
      unsubscribe: function(showID) {
        return $http.post('/tv/unsubscribe', {params: { showID : showID }});
      }
    };
  }]);
})();