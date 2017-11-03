var app = angular.module('medical');

app.factory('dataService', DataService);


function DataService($http){

	var service = {}

	service.getMedicineList = getMedicineList;
	service.postOrderList = postOrderList;
	service.getOrderList = getOrderList;
	service.sendToManager = sendToManager;
	
	
	function getMedicineList(callback){
		$http.get('/store/getmedicinelist/')
            .then(function (response) {
                callback(response)
            });

	}

	function sendToManager(callback){
		$http.post('/store/postLessCountMedicinelist/', data)
	}

	function postOrderList(data, callback){
		$http.post('/order/postorderlist/', data)
	}


	function getOrderList(callback){
		$http.get('/order/getorderlist/')
			 .then(function(response){
			 	callback(response)
			 });
	}

	return service;
}



