app.controller('UserController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal, md5) {

	
	$scope.users = [];
	$scope.usersLocal = [];
	$scope.userTypes = [{id:'1', type:'Administrator'},{id:'2', type:'Lekarz'},{id:'3', type:'Asystentka'}]
	 
	BaseService.post(DisplayBoardInfo.config.url.user.list).then(function(response) {
	  $scope.users = response; 
	});
	
	$scope.reloadList = function() {
		BaseService.post(DisplayBoardInfo.config.url.user.list).then(function(response) {
			 $scope.users = response;
			 $scope.tableParams.reload();
			});
	}
	
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
                    
            $scope.usersLocal = orderedData;       
            params.total(orderedData.length); // set total for recalc

            $scope.usersLocal = $scope.usersLocal.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.usersLocal.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
	 
	$scope.removeUser = function(userToRemove) {
		 BaseService.post(DisplayBoardInfo.config.url.user.remove, { user: userToRemove}).then(function(response) {
			 $scope.reloadList();
	     });
	    };
	 
	 $scope.saveUserChanges = function () {
		 BaseService.post(DisplayBoardInfo.config.url.user.save, { user: $scope.user}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.updateUser = function (userToUpdate) {
		 if (!(typeof userToUpdate.userType == 'string' || userToUpdate.userType instanceof String))
			 userToUpdate.userType = userToUpdate.userType.name;
		 
		 BaseService.post(DisplayBoardInfo.config.url.user.update, { user: userToUpdate}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.launchModal = function () {
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/user/newUserModal.html',
		      controller: ModalInstanceCtrl
		    });
		    
		    modalInstance.result.then(function ($user) {
		    	$scope.reloadList()
		    });
		  };
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.user = {login : '', password:'', userType:''};
			$scope.password = {plain:''};
			$scope.userTypes = [{id:'1', type:'Administrator'},{id:'2', type:'Lekarz'},{id:'3', type:'Asystentka'}]
		
			$scope.checkIfLoginExist = function(){
				 //$scope.user.login
				return false;
				 //return true; - true oznacza, że login już istnieje i zostanie ustawiony komunikat w modalu 
			}
			
			$scope.addUser = function () {
				userExist = $scope.checkIfLoginExist(); 
				if (!userExist){
					
					$scope.user.password = md5.createHash($scope.password.plain);
					
					BaseService.post(DisplayBoardInfo.config.url.user.save, { user: $scope.user}).then(function(response) {
						$modalInstance.close($scope.user);
				    });
				 }
				 return userExist;
			};

			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
			
	};
});