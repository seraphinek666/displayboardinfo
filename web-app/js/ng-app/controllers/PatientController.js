app.controller('PatientController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal) {


	$scope.patients = [];
	
		 
	BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
		  $scope.patients = response; 
		});
	
	$scope.reloadList = function() {
		BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
			  $scope.patients = response; 
			});
		
		// TODO zrób odświeżanie listy na GUI, bo obiekty przychodza ale cos mi nie dziala
	}
	
	
	
	
	 $scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        filter: {
	            name: ''       // initial filter
	        },
	        sorting: {
	        	name: 'asc'     // initial sorting
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

	            params.total(orderedData.length); // set total for recalc
													// pagination
	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	 });
	 
	 $scope.delete = function (index) {
	      $scope.tableParams.data.splice(index,1);
	 };
	 
	 
	 $scope.removePatient = function() {
		 BaseService.post(DisplayBoardInfo.config.url.patient.remove, { patient: $scope.patient}).then(function(response) {
			 $scope.reloadList();
	     });
	    };
	 
	 
	 
	 $scope.savePatientChanges = function () {
		 BaseService.post(DisplayBoardInfo.config.url.patient.save, { patient: $scope.patient}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.launchModal = function () {
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/patient/newPatientModal.html',
		      controller: ModalInstanceCtrl
		    });
		    
		    modalInstance.result.then(function (patient) {
		      console.log(patient.pesel)	// tu mam model patienta z danymi z
											// modala
		    });
		  };
		  
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.patient = {name : '', surname:'', pesel:''};
		
			$scope.addPatient = function () {
				$modalInstance.close($scope.patient);
				 BaseService.post(DisplayBoardInfo.config.url.patient.save, { patient: $scope.patient}).then(function(response) {
					// TODO jakoś odświeżyć listę metoda z kontrolera nadrzednego ?
			     });
				
			};

			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
	};
    
});