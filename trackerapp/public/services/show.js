// angular.module('MyApp')
//   .factory('Show', ['$resource', function($resource) {
//     return $resource('/tv/shows/:_id');
//   }]);
  
// angular.module('MyApp')
//   .factory('Show', ['$http', function($http) {
//     return {
//       subscribe: function(show, user) {
//         return $http.get('/api/subscribe', { showId: show._id });
//       }
//     };
//   }]);