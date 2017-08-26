angular.module('MyApp')
  .factory('Subscription', ['$http', function($http) {
    return {
      subscribe: function(show) {
        return $http.post('/tv/subscribe', {params: { show : show }});
      },
      unsubscribe: function(showID) {
        return $http.post('/tv/unsubscribe', {params: { showID : showID }});
      }
    };
  }]);