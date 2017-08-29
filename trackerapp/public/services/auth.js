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
              // $alert({
              //   title: 'Cheers!',
              //   content: 'You have successfully logged in.',
              //   placement: 'top-right',
              //   type: 'success',
              //   duration: 3
              // });
            })
            .catch(function() {
              // $alert({
              //   title: 'Error!',
              //   content: 'Invalid username or password.',
              //   placement: 'top-right',
              //   type: 'danger',
              //   duration: 3
              // });
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
              // $alert({
              //   title: 'Congratulations!',
              //   content: 'Your account has been created.',
              //   placement: 'top-right',
              //   type: 'success',
              //   duration: 3
              // });
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
              // $alert({
              //   title: 'Error!',
              //   content: response.data,
              //   placement: 'top-right',
              //   type: 'danger',
              //   duration: 3
              // });
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
              $cookies.remove('user');
              // $alert({
              //   content: 'You have been logged out.',
              //   placement: 'top-right',
              //   type: 'info',
              //   duration: 3
              // });
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