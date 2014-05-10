app.controller('UserController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal) {

	
	$scope.users = [];
	
	// to wywala apkę na "list" więc zakomentowałem
	 
	BaseService.post(DisplayBoardInfo.config.url.user.list).then(function(response) {
	  $scope.users = response; 
	});
		 
    
	
	
	
	 $scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        filter: {
	            login: ''       // initial filter
	        },
	        sorting: {
	            login: 'asc'     // initial sorting
	        }
	    }, {
	        total: $scope.users.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var filteredData = params.filter() ?
	                    $filter('filter')($scope.users, params.filter()) :
	                    	$scope.users;
	            var orderedData = params.sorting() ?
	                    $filter('orderBy')(filteredData, params.orderBy()) :
	                    	$scope.users;

	            params.total(orderedData.length); // set total for recalc
													// pagination
	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	 });
	 
	 $scope.delete = function (index) {
	      $scope.tableParams.data.splice(index,1);
	 }
	 
	 
	 $scope.removeItems = function() {
	        $scope.items = null;
	        BaseService.post($scope.config.remove, $scope.selectedItems).then(function(response) {
	            $scope.selectedItem = null;
	            $scope.loadItemList();
	        });
	    },
	 
	 
	 
	 $scope.saveUserChanges = function () {
	      // zastąp mnie połączeniem z backendem
	 }
	 
	 $scope.launchModal = function () {
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/user/newUserModal.html',
		      controller: ModalInstanceCtrl
		    });
		    
		    modalInstance.result.then(function (user) {
		      console.log(user.pesel)	// tu mam model usera z danymi z modala
		    });
		  };
		  
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.user = {name : '', surname:'', pesel:''};
		
			$scope.addUser = function () {$modalInstance.close($scope.user)};

			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
	};
});