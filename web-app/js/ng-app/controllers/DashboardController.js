app.controller('DashboardController', function($scope, $routeParams, $location,
		$translate, BaseService, $dialogs, $cookieStore, $filter,
		ngTableParams, $modal, toaster, md5) {

	// obsluga akcji
	$scope.dashboards = [];
	$scope.dashboardsLocal = [];
	$scope.physicians = [];
	$scope.rooms = [];
		
	BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
		  $scope.physicians = response; 
		});
	
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
		    	  }
		      }
		});

		modalInstance.result.then(function($dashboard) {
//			$scope.reloadList()
			
		});
	};

	var ModalInstanceCtrl = function($scope, $modalInstance, physicians) {
		$scope.dashboard = {
			name : '',
			component : '',
			physician : '',
			template : ''
		};
		
		$scope.west = {
			type:'',
			config:''
		};
		$scope.east = {
			type:'',
			config:''
		};
		$scope.north = {
			type:'',
			config:''	
		};
		$scope.south = {
			type:'',
			config:''	
		};
		
		$scope.components= [{name: 'zegar'},{name: 'lekarz'},{name: 'gabinet'},{name: 'reklama'}];
		$scope.physicians = physicians;
		$scope.addDashboard = function() {
			$modalInstance.close($scope.dashboard);
//			BaseService.post(DisplayBoardInfo.config.url.patient.save, {
//				patient : $scope.patient
//			}).then(function(response) {
//			});
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
