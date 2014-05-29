app.controller('DashboardController', function($scope, $routeParams, $location,
		$translate, BaseService, $dialogs, $cookieStore, $filter,
		ngTableParams, $modal, toaster, md5) {

	// obsluga akcji
	$scope.dashboards = [];
	$scope.dashboardsLocal = [];
	$scope.physicians = [];
	$scope.rooms = [];
	
	$scope.fetchPhysicians = function() {
		BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
			$scope.physicians = response;
			});
	};
	
	$scope.fetchRooms = function() {
		BaseService.post(DisplayBoardInfo.config.url.room.list).then(function(response) {
			 $scope.rooms = response;
			});
	};
	
	$scope.fetchPhysicians();
	$scope.fetchRooms();
	
	$scope.launchModal = function() {
		$scope.fetchPhysicians();
		$scope.fetchRooms();
		var modalInstance = $modal.open({
			templateUrl : '/displayboardinfo/view/dashboard/newDashboardModal.html',
			controller : ModalInstanceCtrl,
		      resolve: {
		    	  physicians : function(){
		    		  return $scope.physicians;
		    	  },
		    	  rooms : function(){
		    		  return $scope.rooms;
		    	  }
		      }
		});

		modalInstance.result.then(function($dashboard) {
//			$scope.reloadList()
			
		});
	};

	var ModalInstanceCtrl = function($scope, $modalInstance, physicians, rooms) {
		
		$scope.dashboard = {
			name : '',
			components : [],
			template : ''
		};
		
		$scope.west = {
			location : 'west',
			type:'',
			config:''
		};
		$scope.east = {
			location : 'east',
			type:'',
			config:''
		};
		$scope.north = {
			location : 'north',
			type:'',
			config:''	
		};
		$scope.south = {
			location : 'south',
			type:'',
			config:''	
		};
		
		$scope.components= [
		{name: 'zegar',type:'ClockWidget'},
		{name: 'lekarz',type:'PhysiciansTermList'},
		{name: 'gabinet',type:'CalendarWidget'},
		{name: 'reklama',type:'AdvertisementArea'},
		{name: 'informacje',type:'InfoArea'}
		];
		
		$scope.physicians = physicians;
		$scope.rooms = rooms;
		
		$scope.clear = function(position){
			position.config = '';
		};
		$scope.clearAll = function(){
			$scope.west.type = '';
			$scope.west.config = '';
			$scope.east.type = '';
			$scope.east.config = '';
			$scope.north.type = '';
			$scope.north.config = '';
			$scope.south.type = '';
			$scope.south.config = '';
		};
		
		$scope.addDashboard = function() {
			if($scope.west.type){
				$scope.dashboard.components.push($scope.west);
			}
			if($scope.east.type){
				$scope.dashboard.components.push($scope.east);
			}
			if($scope.north.type){
				$scope.dashboard.components.push($scope.north);
			}
			if($scope.south.type){
				$scope.dashboard.components.push($scope.south);
			}
			
			BaseService.post(DisplayBoardInfo.config.url.dashboard.save, { dashboard: $scope.dashboard}).then(function(response) {
		    });

			$modalInstance.close($scope.dashboard);
			
		};

		$scope.cancelModal = function() {
			$modalInstance.dismiss('cancelled')
		};
		
		// obsluga wzorcow tablicy
		$scope.templates = [ 
			{
				name : 'template1',
				url : '/displayboardinfo/view/dashboard/dashboard_template1.html'
			}, 
			{
				name : 'template2',
				url : '/displayboardinfo/view/dashboard/dashboard_template2.html'
			},
			{
				name : 'template3',
				url : '/displayboardinfo/view/dashboard/dashboard_template3.html'
			},
			{
				name : 'template4',
				url : '/displayboardinfo/view/dashboard/dashboard_template4.html'
			},
			{
				name : 'template5',
				url : '/displayboardinfo/view/dashboard/dashboard_template5.html'
			},
			{
				name : 'template6',
				url : '/displayboardinfo/view/dashboard/dashboard_template6.html'
			},
			{
				name : 'template7',
				url : '/displayboardinfo/view/dashboard/dashboard_template7.html'
			},
			{
				name : 'template8',
				url : '/displayboardinfo/view/dashboard/dashboard_template8.html'
			}
		];		
			
	};

});
