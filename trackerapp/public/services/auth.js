(function () {
angular.module('MyApp')
  .factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore','$timeout','ngToast',
    function($http, $location, $rootScope, $cookies, $timeout, ngToast) {
      $rootScope.currentUser = $cookies.get('user');
      $cookies.remove('user');

      return {
          
        login: function(user) {
          return $http.post('/tvApp/login', user)
            .then(function(data) {
              $rootScope.currentUser = data;
              $location.path('/');
              $timeout(function() {
                ngToast.create({
                  content:'<strong>ngToast</strong>: a simple Angular provider for toast notifications!',
                  dismissOnTimeout: false,
                  dismissButton: true,
                  dismissOnClick: false
                });
                }, 1000);
            })
            .catch(function() {
              $timeout(function() {
                ngToast.create({
                  content:'<strong>ngToast</strong>: a simple Angular provider for toast notifications!',
                  dismissOnTimeout: false,
                  dismissButton: true,
                  dismissOnClick: false
                });
                }, 1000);
            });
        },
        
        signup: function(user) {
          return $http.post('/tvApp/signup', user)
            .then(function() {
              $location.path('/login');
                $timeout(function() {
                ngToast.create({
                  content:'<strong>ngToast</strong>: a simple Angular provider for toast notifications!',
                  dismissOnTimeout: false,
                  dismissButton: true,
                  dismissOnClick: false
                });
                }, 1000);
            })
            .catch(function(response) {
                $timeout(function() {
                ngToast.create({
                  content:'<strong>ngToast</strong>: a simple Angular provider for toast notifications!',
                  dismissOnTimeout: false,
                  dismissButton: true,
                  dismissOnClick: false
                });
                }, 1000);
            });
        },
        
        logout: function() {
          return $http.get('/tvApp/logout')
            .then(function() {
              $rootScope.currentUser = null;
              $cookies.remove('user');;
                $timeout(function() {
                ngToast.create({
                  content:'<strong>ngToast</strong>: a simple Angular provider for toast notifications!',
                  dismissOnTimeout: false,
                  dismissButton: true,
                  dismissOnClick: false
                });
                }, 1000);
          });
        }
      };
    }]);
})();