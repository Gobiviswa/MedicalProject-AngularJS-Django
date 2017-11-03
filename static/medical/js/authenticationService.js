var app = angular.module('medical');



app.factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', '$rootScope', '$cookies']

function AuthenticationService($http, $rootScope, $cookies){

	var service = {
		
	}
	service.login = login;
	service.setCredentials = setCredentials;
	service.removeCredentials = removeCredentials;
	
	function login(username, password, callback){

		$http.get('/userlogin/', {params: { 'username': username, 'password': password }})
            .then(function (response) {
                callback(response)
            });

	}

	function setCredentials(username, password){

    	$rootScope.globals = {
    		currentUser : {
    			username : username,
    			password : password
    		}
    	}

    	// set default auth header for http requests
    	$http.defaults.headers.common['Authorization'] = 'Basic ' + username + ':' + password ;

    	var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
    	
	}

	function removeCredentials(){

		$rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';

	}


	return service;
}



