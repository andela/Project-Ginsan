angular.module('mean.system')
.controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService','AuthService', function ($scope, Global, $location, socket, game, AvatarService, AuthService) {
    $scope.global = Global;
    $scope.showErrorMessage = false;
    $scope.errorMessage = "";

    $scope.playAsGuest = function() {
      game.joinGame();
      $location.path('/app');
    };

    $scope.showError = function() {
      if ($location.search().error) {
        return $location.search().error;
      } else {
        return false;
      }
    };

    $scope.signIn = function(user){
      if (!user.email || !user.password) {
        $scope.showErrorMessage = true;
      }else{
        AuthService.Login(user.email, user.password, function(state){
          $scope.showErrorMessage = !state;
        });
      }
    };

    $scope.signUp = function(user){
      if (!user.name || !user.email || !user.password) {
        $scope.showErrorMessage = true;
      }else{
        AuthService.Register(user.name, user.email, user.password, user.avatar, function(state, data){
          if(!state){
            $scope.errorMessage = data.data.error;
            $scope.showErrorMessage = true;
          }
        });
      }
    };



    $scope.avatars = [];
    AvatarService.getAvatars()
      .then(function(data) {
        $scope.avatars = data;
      });

}]);