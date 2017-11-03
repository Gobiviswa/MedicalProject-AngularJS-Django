var app = angular.module('medical');


app.controller('viewController', ViewController);

function ViewController($scope, dataService){
	$scope.name = "view controller";
	$scope.list = []
	$scope.orderlist = {}


	
	dataService.getOrderList(function(response){
		$scope.orderListData = response.data;

		for (var i = 0; i < $scope.orderListData.length; i++){
			var no = $scope.orderListData[i].invoiceNo;

			if (no in $scope.orderlist){
				$scope.orderlist[no].push($scope.orderListData[i])
			}
			else{
				$scope.orderlist[no] = []
				$scope.orderlist[no].push($scope.orderListData[i])
			}

		}	
	})
	
};