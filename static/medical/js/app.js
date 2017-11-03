var app = angular.module('medical',  ['ui.router', 'ngCookies']);

app.config(config);
app.run(run);

config.$inject = ['$interpolateProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];
function config( $interpolateProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	  
	$interpolateProvider.startSymbol('[[').endSymbol(']]');

	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	$stateProvider
	
	.state('login', {
		url : '/',
    /*template : "<h1>hi how are you</h1>",*/
		templateUrl : '/static/templates/login.html',

		controller  : 'loginController'
	})

	.state('main', {
		url : '/main',
		templateUrl : '/static/templates/main.html',
		controller  : 'mainController'
	})

	.state('main.home', {
  		url : '/home',
    	templateUrl : '/static/templates/main-home.html',
    	controller  : 'homeController'
	})

	.state('main.view', {
  		url : '/view-invoice',
    	templateUrl : '/static/templates/main-view.html',
    	controller  : 'viewController'
	})

	.state('main.create', {
  		url : '/create-invoice',
    	templateUrl : '/static/templates/main-create.html',
    	controller  : 'createController'
    })

	.state('logout', {
		url : '/',
    /*template : "<h1>hi how are you</h1>",*/
		templateUrl : '/static/templates/login.html',

		controller  : 'loginController'
	})


   $urlRouterProvider.otherwise('/')
};


run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

function run($rootScope, $location, $cookies, $http){
	// keep user logged in after page refresh
	$rootScope.globals = $cookies.getObject('globals') || {};

	if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.username + ':' + $rootScope.globals.currentUser.password ;
	}

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/');
            }
        });
}


/*var app = angular.module('medical', ['ngRoute','ui.router']);

app.config(config);


config.$inject = ['$interpolateProvider', '$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider']

function config($interpolateProvider, $locationProvider, $routeProvider, $stateProvider, $urlRouterProvider){
	$interpolateProvider.startSymbol('[[').endSymbol(']]');

	$routeProvider
		
		.when('/main', {
			templateUrl : 'mainController',
    		controller  : 'mainController'
		})

		.when('/home', {
			templateUrl : 'homeController',
    		controller  : 'homeController'
		})

		.when('/view', {
    		templateUrl : 'viewController',
    		controller  : 'viewController'
		})

		.when('/create', {
    		templateUrl : 'createController',
    		controller  : 'createController'
		})

}*/

