angular.module('MyApp')
  .controller('NavBarCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.logout = function() {
      Auth.logout();
    };
  }]);