var app = angular.module('medical');

app.controller('homeController', HomeController);

HomeController.$inject = ['$scope', 'dataService', '$rootScope']
function HomeController($scope, dataService, $rootScope){
	$scope.minimumCount = 15;
	$scope.lowCountMedicines = 0;
	$scope.medicineList = [];
	$scope.lowCountMedicineList = [];
	$scope.submitToManager = submitToManager;



	dataService.getMedicineList(function(response){
		$scope.medicineList = response.data;
		/*for (var i = 0; i < $scope.medicine_data.length ; i++) {
			$scope.medicineList.push($scope.medicine_data[i])
		}*/
		for (var i = 0; i < $scope.medicineList.length; i++) {
			if( $scope.medicineList[i].medicine_count < $scope.minimumCount ){
				var lowCountList = {}
				$scope.lowCountMedicineList.push($scope.medicineList[i])
			}
		}
		$scope.lowCountMedicines = $scope.lowCountMedicineList.length;
		if($scope.lowCountMedicineList.length == 0){
			document.getElementById("seethelist").disabled = true;
			document.getElementById("sendtomanager").disabled = true;
		}

	})



	function submitToManager(message){
		var user = $rootScope.globals.currentUser.username
		if(message == null){
			message = "";
		}
		data = {'lowCountMedicineList': $scope.lowCountMedicineList, 'message': message, 'user': user }
		dataService.sendToManager(data);
	}

};



