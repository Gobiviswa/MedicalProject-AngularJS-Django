var app = angular.module('medical');

app.controller('loginController',LoginController);
LoginController.$inject = ['$scope', 'AuthenticationService', '$location']


function LoginController( $scope, AuthenticationService, $location){

	
	$scope.login = login;
	$scope.errorBoolean = false;
    
    $scope.AuthenticationService = AuthenticationService;


	function login () {
            
            AuthenticationService.login($scope.username, $scope.password, function(response){
            	if(response.data.length == 0){
            		$scope.errorBoolean = true;
            	}
            	else{
                    
                    $scope.errorBoolean = false;
                    
                    AuthenticationService.setCredentials($scope.username, $scope.password)
                    $location.path('/main/home')
                    
            	}
            	
            })
            	
            
        };
}





