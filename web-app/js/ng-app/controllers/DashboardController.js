app.controller('DashboardController',function($scope, $routeParams, $location, $translate,
		BaseService, $dialogs, $cookieStore, $filter,ngTableParams, $modal, toaster, md5) {

			// obsluga akcji
			$scope.dashboards = [];
			$scope.dashboardsLocal = [];
			$scope.physicians = [];

			BaseService.post(DisplayBoardInfo.config.url.dashboard.list).then(function(response) {
				$scope.dashboards = response;
			});
			
			$scope.reloadList = function() {
				BaseService.post(DisplayBoardInfo.config.url.dashboard.list).then(function(response) {
					 $scope.dashboards = response;
					 $scope.tableParams.reload();
					});
			};

			$scope.fetchPhysicians = function() {
				BaseService.post(
						DisplayBoardInfo.config.url.physician.list)
						.then(function(response) {
							$scope.physicians = response;
						});
			};

			 $scope.removeDashboard = function(dashboardToRemove) {
				 BaseService.post(DisplayBoardInfo.config.url.dashboard.remove, { dashboard: dashboardToRemove }).then(function(response) {
					 $scope.reloadList();
			     });
			    };
			    
			 $scope.updateDashboard = function (dashboardToUpdate) {
				 BaseService.post(DisplayBoardInfo.config.url.dashboard.update, { dashboard: dashboardToUpdate}).then(function(response) {
					 $scope.reloadList();
			     });
			 };
		
			$scope.fetchPhysicians();

			$scope.tableParams = new ngTableParams({
				page : 1, // show first page
				count : 10, // count per page
				filter : {
					name : '' // initial filter
				},
				sorting : {
					name : 'asc' // initial sorting
				}
			}, {
				total : $scope.dashboards.length, // length of data
				getData : function($defer, params) {
					// use build-in angular filter

					var filteredData = params.filter() ? 
							$filter('filter')($scope.dashboards,params.filter()) : 
						$scope.dashboards;
					var orderedData = params.sorting() ? 
							$filter('orderBy')(filteredData, params.orderBy()): 
						$scope.dashboards;

					$scope.dashboardsLocal = orderedData;
					params.total(orderedData.length); // set total for
					// recalc

					$scope.dashboardsLocal = $scope.dashboardsLocal.slice((params.page() - 1)* params.count(), params.page()* params.count());
					$defer.resolve($scope.dashboardsLocal.slice((params.page() - 1)* params.count(), params.page()* params.count()));
				}
			});

			
			$scope.launchEditModal = function(dashboardToEdit) {
				$scope.dashboardToEdit = dashboardToEdit;
				$scope.fetchPhysicians();
				var modalInstance = $modal
				.open({
					templateUrl : '/displayboardinfo/view/dashboard/newDashboardModal.html',
					controller : ModalInstanceCtrl,
					resolve : {
						physicians : function() {
							return $scope.physicians;
						},
						dashboardToEdit : function() {
							return $scope.dashboardToEdit;
						}
					}
				});

		modalInstance.result.then(function($dashboard) {
			$scope.reloadList()
		});
			}
			
			$scope.launchModal = function() {
				$scope.fetchPhysicians();

				var modalInstance = $modal
						.open({
							templateUrl : '/displayboardinfo/view/dashboard/newDashboardModal.html',
							controller : ModalInstanceCtrl,
							resolve : {
								physicians : function() {
									return $scope.physicians;
								},
								dashboardToEdit : function() {
									return '';
								}
							}
						});

				modalInstance.result.then(function($dashboard) {
					$scope.reloadList()
				});
			};
			
			var ModalInstanceCtrl = function($scope, $modalInstance,
					physicians, dashboardToEdit) {
				
				$scope.dashboard = {
					name : '',
					components : [],
					template : ''
				};
				
				$scope.west = {
					location : 'west',
					type : '',
					config : ''
				};
				$scope.east = {
					location : 'east',
					type : '',
					config : ''
				};
				$scope.north = {
					location : 'north',
					type : '',
					config : ''
				};
				$scope.south = {
					location : 'south',
					type : '',
					config : ''
				};

				$scope.physicians = physicians;

				$scope.clear = function(position) {
					position.config = '';
				};
				$scope.clearAll = function() {
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
					if ($scope.west.type) {
						$scope.dashboard.components.push($scope.west);
					}
					if ($scope.east.type) {
						$scope.dashboard.components.push($scope.east);
					}
					if ($scope.north.type) {
						$scope.dashboard.components.push($scope.north);
					}
					if ($scope.south.type) {
						$scope.dashboard.components.push($scope.south);
					}

					BaseService.post(
							DisplayBoardInfo.config.url.dashboard.save,
							{
								dashboard : $scope.dashboard
							}).then(function(response) {
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
						} ];
				
				$scope.components = [ {
					name : 'zegar',
					type : 'ClockWidget'
				}, {
					name : 'lekarz',
					type : 'PhysiciansTermList'
				}, {
					name : 'gabinet',
					type : 'CalendarWidget'
				}, {
					name : 'reklama',
					type : 'AdvertisementArea'
				}, {
					name : 'informacje',
					type : 'InfoArea'
				} ];
				
				if(dashboardToEdit)
				{
					$scope.variant = 'edit';
					$scope.dashboard.name = dashboardToEdit.name;
					
					for (var i = 0; i < $scope.templates.length; i++){
						if($scope.templates[i].name==dashboardToEdit.template)
						{
							$scope.dashboard.template = $scope.templates[i]; 
						}
					}
				}
				else
				{
					$scope.variant = 'add';

				}
				
			};
			

			

			
		});
