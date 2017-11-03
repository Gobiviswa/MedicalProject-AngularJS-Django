var app = angular.module('medical');

app.controller('mainController', MainController);
MainController.$inject = ['$scope', '$location', 'AuthenticationService']

function MainController($scope, $location, AuthenticationService){
	
   	$scope.changeController = changeController; 
   	$scope.logoutuser = logoutuser;

	
	function changeController(controller){
		
		if(controller=="home"){
			$location.path('/main/home')
		}
		else if(controller=="view"){
			$location.path('/main/view-invoice')
		}
		else if(controller=="create"){
			$location.path('/main/create-invoice')
		}
		
	}

	function logoutuser(){
		AuthenticationService.removeCredentials()
		$location.path('/')
	}

};










