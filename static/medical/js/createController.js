var app = angular.module('medical');


app.controller('createController', CreateController);

function CreateController($scope, dataService){
	$scope.rowInputs = rowInputs;
	$scope.rowEditedInputs = rowEditedInputs;
	$scope.checkInputs = checkInputs
	$scope.addToList = addToList;
	$scope.editObject = editObject;
	$scope.makeEmpty = makeEmpty;
	$scope.changeBoolean = changeBoolean;
/*	$scope.finishEdit = finishEdit;
*/	$scope.deleteRow = deleteRow;
	$scope.deleteObject = deleteObject;
	$scope.medicineSelect = medicineSelect;
	$scope.getMedicinePrice = getMedicinePrice;
	$scope.submitInvoice = submitInvoice;
	$scope.submitToDB = submitToDB

	$scope.orderList = [];
	$scope.medicineList = []
	

	$scope.populateBool = false;
	$scope.editBool = false;
	$scope.slno = 0; 
	$scope.rowNo = 0;
	$scope.total = 0.0;
	$scope.editModelErrorBool = false;

	dataService.getMedicineList(function(response){
		$scope.medicine_data = response.data;
		for (var i = 0; i < $scope.medicine_data.length ; i++) {
			$scope.medicineList.push($scope.medicine_data[i].medicine_name)

		}
	})


	function medicineSelect(mode, medicine){
		if(mode == 'insert'){
			$scope.medicineName = medicine;
		}
		else{
			$scope.editMedicineName = medicine;
		}
	}

	
	function rowInputs(){
		var available = 0;
		for (var i = 0; i < $scope.medicine_data.length ; i++) {
			if ($scope.medicineName == $scope.medicine_data[i].medicine_name ){
				var available = 1;
				//addToList($scope.medicineName, $scope.qtyRequired)
				break;
			}
		}
		if(available == 1){
			addToList($scope.medicineName, $scope.qtyRequired)
		}
		else{
			alert("please choose correct medicine name")
			makeEmpty();
		}
	}	
	

	function checkInputs(medicineName, qtyRequired){
		var check = 0;
		
		for (var i = 0; i < $scope.medicine_data.length ; i++) {
			if(medicineName == $scope.medicine_data[i].medicine_name){
				
					
				
				if(qtyRequired <= $scope.medicine_data[i].medicine_count){

					check = 1;
					return check;
				}
				else{
					alert("Only "+$scope.medicine_data[i].medicine_count + " medicines available in the Stock")
					$scope.qtyRequired = $scope.medicine_data[i].medicine_count;
					$scope.editQtyRequired = $scope.medicine_data[i].medicine_count;
					check = 2;
					return 2;
				}

			}

		}
		return check;
	}


	function addToList(medicineName, qtyRequired){
		$scope.slno += 1;
		var equals = false;
		var position = 0;
		var medicineCount = 0;
		var price = "";




		for (var i = 0; i < $scope.medicine_data.length ; i++) {
			if(medicineName == $scope.medicine_data[i].medicine_name){
				medicineCount =  $scope.medicine_data[i].medicine_count
				price = $scope.medicine_data[i].medicine_price
			}
		}
		


		var cost = (qtyRequired * price).toFixed(2);

		var object = {
			'medicineNo':$scope.slno, 
			'medicineName':medicineName, 
			'qtyRequired':qtyRequired, 
			'price':price, 
			'cost':cost
		}
		if ( $scope.orderList.length == 0){
			if(qtyRequired <= medicineCount){
				$scope.orderList.push(object);
				$scope.populateBool = true;
				makeEmpty();
			}
			else{
				alert("Only" + (medicineCount) + " medicines available in the Stock");
				$scope.qtyRequired = medicineCount;
			}
		}				

			
		else{
			
			for(var i = 0; i < $scope.orderList.length; i++){
				if(medicineName == $scope.orderList[i].medicineName){
					equals = true;
					position = i;
				}
			}
			
			if ( equals == true ){
				var totalQtyReq = $scope.orderList[position].qtyRequired + qtyRequired;
				var remainingQty = medicineCount - $scope.orderList[position].qtyRequired
				if(totalQtyReq <= medicineCount){
					$scope.orderList[position].qtyRequired = totalQtyReq;
					$scope.orderList[position].cost = (parseFloat($scope.orderList[position].cost) + parseFloat(cost)).toFixed(2);
					makeEmpty()
				}
				else{

					alert("Only "+ (remainingQty) + " medicines available in the Stock");
					$scope.qtyRequired = remainingQty;
				}
			}
			else{
				
				if(qtyRequired <= medicineCount){
					$scope.orderList.push(object);
					$scope.populateBool = true;
					makeEmpty();
				}
				else{
					alert("Only "+ (medicineCount) + " medicines available in the Stock");
					$scope.qtyRequired = medicineCount;
				}
			}
		}
	}

	function editObject(row, rowNo){

		$scope.editMedicineName = row.medicineName;
		$scope.editQtyRequired = row.qtyRequired;
		$scope.rowNo = rowNo + 1;
		
	}


	function rowEditedInputs(){
		
		for (var i = 0; i < $scope.medicine_data.length ; i++) {
			if($scope.editMedicineName == $scope.medicine_data[i].medicine_name){
				if($scope.editQtyRequired <= $scope.medicine_data[i].medicine_count){
					
					$scope.editModelErrorBool = false;
					var price = getMedicinePrice($scope.editMedicineName)
					var cost = ($scope.editQtyRequired * price).toFixed(2);
				
					for (var i = 0; i < $scope.orderList.length ; i++) {
						if($scope.orderList[i].medicineNo == $scope.rowNo){
					
						$scope.orderList[i].medicineName = $scope.editMedicineName;
						$scope.orderList[i].qtyRequired = $scope.editQtyRequired;
						$scope.orderList[i].price = price;
						$scope.orderList[i].cost = cost;

						$('#editObject').modal('hide');
						}
					}
				}
				else if ($scope.editQtyRequired > $scope.medicine_data[i].medicine_count) {
					
					alert("Only "+$scope.medicine_data[i].medicine_count + " medicines available in the Stock")
					$scope.editQtyRequired = $scope.medicine_data[i].medicine_count;
				}
				else{
					$scope.editModelErrorBool = true;
					makeEmpty()
				}
			}
		}
		
	}

	function deleteRow(row, index){
		$scope.rowNo = index;
	}

	function deleteObject(){
		var slno = 1;
		
		$scope.orderList.splice($scope.rowNo, 1);
		for (var i = 0; i < $scope.orderList.length; i++) {
			$scope.orderList[i].medicineNo = slno;
			slno += 1;
		}
		if($scope.orderList.length == 0){
			$scope.populateBool = false;
		}


		$("#deleteObject").modal('hide');
	}


	function submitInvoice(){
		$scope.total = 0;
		for (var i = 0; i < $scope.orderList.length; i++) {
			$scope.total = $scope.total +  Number($scope.orderList[i].cost)

		}
		$scope.total = parseFloat($scope.total).toFixed( 2 );

	}

	function submitToDB(){
		if(confirm("Want to submit the form?") == true){
			data = {'invoiceData': $scope.orderList, 'total':$scope.total}
			dataService.postOrderList(data, function(response){
				alert("response came from service")
	})
			
			alert("form submitted")
			$("#submitInvoice").modal('hide');
			$scope.orderList = []
			$scope.populateBool = false;
			$scope.total = 0.0;
			$scope.slno = 0;
		}
		else{
			$("#submitInvoice").modal('hide');
		}
	}


	function changeBoolean(){
		if($scope.orderList.length != 0 ){
			$scope.populateBool = true;
		}
	}

	function makeEmpty(){
		$scope.medicineName = "";
		$scope.qtyRequired = "";
	}

	function getMedicinePrice(medicineName){
		var price;
		for (var i = 0; i < $scope.medicine_data.length; i++) {
			if( $scope.medicine_data[i].medicine_name == medicineName ){
				price = $scope.medicine_data[i].medicine_price
				return price;
			}
		}
	}

	//$scope.medicineList = ['A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A007', 'A008', 'A009', 'A0010']
};
