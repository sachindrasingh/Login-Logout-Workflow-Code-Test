(function () {
    'use strict';
    app.controller.Dashboard = function($rootScope, $scope, $cookies, $location) {    	
        $rootScope.status = "Logged in";
        $scope.logout = function($event) {
            $rootScope.status = "Logging out (operation in progress)";
        	$event.stopPropagation();
        	$cookies.remove('globals');
        	$rootScope.globals = {};
        	$location.path('/');
        }
    }
})(app||(window.app={}));
