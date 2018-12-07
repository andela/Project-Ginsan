angular.module('mean.system')
  .factory('AuthService', ['HttpService','$location', function(HttpService, $location) {
    return {
        Login: function(email, password, cb){
            HttpService.load({
                method: 'POST',
                url: '/api/auth/login',
                data: { email: email, password: password }
            }, function(success){
                sessionStorage.isUserLoggedIn = 1;
                sessionStorage.user_info = JSON.stringify(success.data.user);
                sessionStorage.api_token = success.data.token;
                window.location.href = '/';
                cb(true);
            }, function(error) {
                cb(false);
            })
        },
        Register: function(name, email, password, avatar, cb){
            HttpService.load({
                method: 'POST',
                url: '/api/auth/signup',
                data: { name: name, email: email, password: password, avatar: avatar }
            }, function(success){
                sessionStorage.isUserLoggedIn = 1;
                sessionStorage.user_info = JSON.stringify(success.data.user);
                sessionStorage.api_token = success.data.token;
                window.location.href = '/';
                cb(true, success.data);
            }, function(error) {
                cb(false, error.data);
            })
        },
        Logout: function(){
            sessionStorage.isUserLoggedIn = 0;
            sessionStorage.user_info = null;
            sessionStorage.api_token = '';
            window.location.href = '/';
        }
    }
  }])