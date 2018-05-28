(function (app) {
    'use strict';
    app.controller.WelcomeScreen = function($rootScope, $scope, $location, $cookies) {
    	$rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $location.path('/dashboard');
        }
        $rootScope.status = "Not logged in";
    }
})(app||(window.app={}));
