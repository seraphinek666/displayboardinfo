app.controller('PhysicianController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal, md5) {
	$scope.physicians = [];
	$scope.users = [];
	$scope.physiciansLocal = [];
	
	BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
	  $scope.physicians = response; 
	});
	
	$scope.reloadList = function() {
		BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
			 $scope.physicians = response;
			 $scope.tableParams.reload();
			 $scope.fetchUsers();
			});
	}
	
	$scope.fetchUsers = function() {
		BaseService.post(DisplayBoardInfo.config.url.user.list).then(function(response) {
			 $scope.users = response;
			});
	}
	$scope.fetchUsers();
	
	$scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            surname: ''       // initial filter
        },
        sorting: {
        	surname: 'asc'     // initial sorting
        }
    }, {
        total: $scope.physicians.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
        	
            var filteredData = params.filter() ?
                    $filter('filter')($scope.physicians, params.filter()) :
                    	$scope.physicians;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    	$scope.physicians;
                    
            $scope.physiciansLocal = orderedData;       
            params.total(orderedData.length); // set total for recalc

            $scope.physiciansLocal = $scope.physiciansLocal.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.physiciansLocal.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
	 
	$scope.removePhysician = function(physicianToRemove) {
		 BaseService.post(DisplayBoardInfo.config.url.physician.remove, { physician: physicianToRemove}).then(function(response) {
			 $scope.reloadList();
	     });
	    };
	 
	 $scope.savePhysicianChanges = function () {
		 BaseService.post(DisplayBoardInfo.config.url.physician.save, { physician: $scope.physician}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.updatePhysician = function (physicianToUpdate) {
		 physicianToUpdate.user = $scope.getUserObject(physicianToUpdate.user.id);
		 BaseService.post(DisplayBoardInfo.config.url.physician.update, { physician: physicianToUpdate}).then(function(response) {
			 $scope.reloadList();
	     });
	 };

	 $scope.getUserObject = function(id) {
		 for (i=0; i<$scope.users.length; i++){
			if($scope.users[i].id == id){
				return $scope.users[i]; 
			} 
		 }
		 
		 return 'error - brak usera'
	 }
	 
	 $scope.launchModal = function () {
		 	$scope.fetchUsers(); 
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/physician/newPhysicianModal.html',
		      controller: ModalInstanceCtrl,
		      resolve: {
		    	  users : function(){
		    		  return $scope.users;
		    	  }
		      }
		    });
		    
		    modalInstance.result.then(function ($physician) {
		    	$scope.reloadList()
		    });
		  };
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance, users) {
			$scope.physician = {name : '', surname:'', specialisation:'', title:'', user:''};
			$scope.users = users;
			
			$scope.addPhysician = function () {
				$modalInstance.close($scope.physician);
				BaseService.post(DisplayBoardInfo.config.url.physician.save, { physician: $scope.physician}).then(function(response) {
				});
			};

			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
	};

    
});