app.controller('PatientController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal, toaster) {


	$scope.patients = [];
	$scope.patientsLocal = [];
		 
	BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
		  $scope.patients = response; 
		});
	
	$scope.reloadList = function() {
		BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
			 $scope.patients = response;
			 $scope.tableParams.reload();
			});
	}

	 $scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        filter: {
	            name: ''       // initial filter
	        },
	        sorting: {
	        	surname: 'asc'     // initial sorting
	        }
	    }, {
	        total: $scope.patients.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	        	
	            var filteredData = params.filter() ?
	                    $filter('filter')($scope.patients, params.filter()) :
	                    	$scope.patients;
	            var orderedData = params.sorting() ?
	                    $filter('orderBy')(filteredData, params.orderBy()) :
	                    	$scope.patients;
	                    
	            $scope.patientsLocal = orderedData;       
	            params.total(orderedData.length); // set total for recalc

	            $scope.patientsLocal = $scope.patientsLocal.slice((params.page() - 1) * params.count(), params.page() * params.count());
	            $defer.resolve($scope.patientsLocal.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	 });
	 

	 $scope.removePatient = function(patientToRemove) {
		 BaseService.post(DisplayBoardInfo.config.url.patient.remove, { patient: patientToRemove}).then(function(response) {
			 $scope.reloadList();
	     });
	    };
	 
	 $scope.savePatientChanges = function () {
		 BaseService.post(DisplayBoardInfo.config.url.patient.save, { patient: $scope.patient}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.savePatientChanges = function (patientToSave) {
		 BaseService.post(DisplayBoardInfo.config.url.patient.save, { patient: patientToSave}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.launchModal = function () {
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/patient/newPatientModal.html',
		      controller: ModalInstanceCtrl
		    });
		    
		    modalInstance.result.then(function ($patient) {
		    	$scope.reloadList()
		    });
		  };
		  
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.patient = {name : '', surname:'', pesel:''};
		
			$scope.addPatient = function () {
				$modalInstance.close($scope.patient);
				 BaseService.post(DisplayBoardInfo.config.url.patient.save, { patient: $scope.patient}).then(function(response) {
			     });
			};

			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
	};
    
});