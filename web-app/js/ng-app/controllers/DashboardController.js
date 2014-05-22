app.controller('DashboardController', function($scope, $routeParams, $location,
		$translate, BaseService, $dialogs, $cookieStore, $filter,
		ngTableParams, $modal, toaster) {

	// obsluga akcji
	$scope.dashboards = [];
	$scope.dashboardsLocal = [];

	$scope.launchModal = function() {
		var modalInstance = $modal.open({
			templateUrl : '/displayboardinfo/view/dashboard/newDashboardModal.html',
			controller : ModalInstanceCtrl
		});

		modalInstance.result.then(function($dashboard) {
//			$scope.reloadList()
			
		});
	};

	var ModalInstanceCtrl = function($scope, $modalInstance) {
		$scope.dashboard = {
			name : '',
			id : ''
		};

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
		
		$scope.template = $scope.templates[0];
		
		// obsluga combobox'ow
		$scope.components = [
			{
				name: 'zegar'
			},
			{
				name: 'lekarz'
			},
			{
				name: 'gabinet'
			},
			{
				name: 'reklama'
			}
		];
		
		$scope.doctors = [
			{
				name: 'lekarz1',
				id: '1'
			},
			{
				name: 'lekarz2',
				id: '2'
			}
		];
		
		$scope.selectedComponents = [];
		
	};

});
