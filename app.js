(function(app){
	'use strict';
    app.module
    .controller('WelcomeScreen', app.controller.WelcomeScreen)
    .controller('Login', app.controller.Login)
    .controller('Dashboard', app.controller.Dashboard)
    .config(config)
    .run(run);


    config.$inject = ['$routeProvider', '$locationProvider'];
	function config($routeProvider) {
      $routeProvider
        .when('/', {
	        controller: 'WelcomeScreen',
	        templateUrl: 'components/welcome/welcome.view.html',
	        controllerAs: 'ctrl'
        })
        .when('/login', {
            controller: 'Login',
            templateUrl: 'components/login/login.view.html',
            controllerAs: 'ctrl'
        })
        .when('/dashboard', {
	        controller: 'Dashboard',
	        templateUrl: 'components/dashboard/dashboard.view.html',
	        controllerAs: 'ctrl'
        })
	    .otherwise({ redirectTo: '/' });
    }
    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
 	function run($rootScope, $location, $cookies, $http) {
		 // keep user logged in after page refresh
        if (!$rootScope.globals) {
            $rootScope.globals = $cookies.getObject('globals') || {};
		}
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/dashboard']) !== -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }


  angular.bootstrap(document.getElementById('app'), [app.module.name]);
})(app || (app={}))