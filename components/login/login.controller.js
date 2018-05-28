(function(app) {
    'use strict';
    app.controller.Login = function($rootScope, $scope, $location, $cookies, $http) {
        $scope.dataLoading = false;
        var rules = /^((?![.,^//\\]).)*$/gm
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $location.path('/dashboard');
        }
        $rootScope.status = "Not logged in";
        $scope.login = function() {
            $rootScope.status = "Logging in (operation in progress)";
            $scope.dataLoading = true;
            $http.defaults.headers.post["Content-Type"] = "application/json";
            $http({
              method: 'POST',
              url: 'https://login-logout-workflow.herokuapp.com/api/user/login',
              // url: 'http://localhost:5000/api/user/login',
              data: {
                password: $scope.password,
                username: $scope.username
              } 
            }).then(function successCallback(response) {
                $scope.dataLoading = false;
                if (response.data.success === 'false') {
                    $rootScope.status = "Not logged in";
                    $rootScope.flash = {
                        type: "error",
                        message: response.data.errorMessage
                    }
                    return;
                }
                $rootScope.flash = '';
                $rootScope.globals.currentUser = {
                    authdata: response.data.data.authdata,
                    username: response.data.data.username
                }            
                var cookieExp = new Date();
                cookieExp.setDate(cookieExp.getDate() + 7);
                $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
                $location.path('/dashboard');
            }, function errorCallback(response) {
                $rootScope.status = "Not logged in";
                $scope.dataLoading = false;
                $rootScope.flash = {
                    type: "error",
                    message: "response"
                }

            });
        };
        $scope.validate = function($event) {
        	var value = $event.target.value;
        	if (value && value.match(rules)) {
        		$scope.form[$event.target.name].$error.invalidPattern =  false;
        	} else if(value) {
        		$scope.form[$event.target.name].$error.invalidPattern = true;

        	}
        }
    }

})(app || (app = {}));