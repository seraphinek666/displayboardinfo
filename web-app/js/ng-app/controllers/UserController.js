app.controller('UserController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal) {

	// to wywala apkę na "list" więc zakomentowałem
	 /*
		 * BaseService.post(DisplayBoardInfo.config.url.user.list).then(function(response) {
		 * $scope.users = response; });
		 */
    
	// syfne dane testowe a'la mock
	 var data = [{name: "wMoroni", surname: "Moroni", pesel: 158956},
	                {name: "Tiancum", surname: "Moroni", pesel: 258956},
	                {name: "Jacob", surname: "Moroni", pesel: 358956},
	                {name: "Nephi", surname: "Moroni", pesel: 458956},
	                {name: "Enos", surname: "Moroni", pesel: 458956},
	                {name: "Tiancum", surname: "Moroni", pesel: 458956},
	                {name: "Jacob", surname: "Moroni", pesel: 458956},
	                {name: "Nephi", surname: "aMoroni", pesel: 458956},
	                {name: "Enos", surname: "Moroni", pesel: 458956},
	                {name: "Tiancum", surname: "Mofgroni", pesel: 458956},
	                {name: "Jacob", surname: "Moroni", pesel: 458956},
	                {name: "Nephi", surname: "Moroni", pesel: 458956},
	                {name: "Enos", surname: "Moroni", pesel: 458956},
	                {name: "Tiancum", surname: "Moroni", pesel: 458956},
	                {name: "Jacob", surname: "Moroni", pesel: 458956},
	                {name: "Nephi", surname: "Moroni", pesel: 458956},
	                {name: "Enos", surname: "Moroni", pesel: 458956}];

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
	        total: data.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var filteredData = params.filter() ?
	                    $filter('filter')(data, params.filter()) :
	                    data;
	            var orderedData = params.sorting() ?
	                    $filter('orderBy')(filteredData, params.orderBy()) :
	                    data;

	            params.total(orderedData.length); // set total for recalc
													// pagination
	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	 });
	 
	 $scope.delete = function (index) {
	      $scope.tableParams.data.splice(index,1);
	 }
	 
	 $scope.saveUserChanges = function () {
	      // zastąp mnie połączeniem z backendem
	 }
	 
	 $scope.launchModal = function () {
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/user/newUserModal.html',
		      controller: ModalInstanceCtrl
		    });
		    
		    modalInstance.result.then(function (user) {
		      console.log(user.pesel)	//tu mam model usera z danymi z modala
		    });
		  };
		  
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.user = {name : '', surname:'', pesel:''};
		
			$scope.addUser = function () {$modalInstance.close($scope.user)};

			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
	};
});