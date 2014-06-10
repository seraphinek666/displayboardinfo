app.controller('RoomController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal, toaster) {
	$scope.rooms = [];
	$scope.roomsLocal = [];
		 
	BaseService.post(DisplayBoardInfo.config.url.room.list).then(function(response) {
		  $scope.rooms = response; 
		});
	
	$scope.reloadList = function() {
		BaseService.post(DisplayBoardInfo.config.url.room.list).then(function(response) {
			 $scope.rooms = response;
			 $scope.tableParams.reload();
			});
	}

	 $scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        filter: {
	            number: ''       // initial filter
	        },
	        sorting: {
	        	number: 'asc'     // initial sorting
	        }
	    }, {
	        total: $scope.rooms.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	        	
	            var filteredData = params.filter() ?
	                    $filter('filter')($scope.rooms, params.filter()) :
	                    	$scope.rooms;
	            var orderedData = params.sorting() ?
	                    $filter('orderBy')(filteredData, params.orderBy()) :
	                    	$scope.rooms;
	                    
	            $scope.roomsLocal = orderedData;       
	            params.total(orderedData.length); // set total for recalc

	            $scope.roomsLocal = $scope.roomsLocal.slice((params.page() - 1) * params.count(), params.page() * params.count());
	            $defer.resolve($scope.roomsLocal.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	 });
	 

	 $scope.removeRoom = function(roomToRemove) {
		 BaseService.post(DisplayBoardInfo.config.url.room.remove, { room: roomToRemove}).then(function(response) {
			 $scope.reloadList();
	     });
	    };
	 
	 $scope.saveRoomChanges = function () {
		 BaseService.post(DisplayBoardInfo.config.url.room.save, { room: $scope.room}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.updateRoom = function (roomToUpdate) {
		 BaseService.post(DisplayBoardInfo.config.url.room.update, { room: roomToUpdate}).then(function(response) {
			 $scope.reloadList();
	     });
	 };
	 
	 $scope.launchModal = function () {
		    var modalInstance = $modal.open({
		      templateUrl: '/displayboardinfo/view/room/newRoomModal.html',
		      controller: ModalInstanceCtrl
		    });
		    
		    modalInstance.result.then(function ($room) {
		    	$scope.reloadList()
		    });
		  };
		  
		  
	var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.room = {number : '', floor:''};
		
			$scope.addRoom = function () {
				 BaseService.post(DisplayBoardInfo.config.url.room.save, { room: $scope.room}).then(function(response) {
						$modalInstance.close($scope.room);
				 });
			};

//			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
	};

    
});