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
			    
			$scope.dashboardToEdit = function(dashboardToEdit) {
				 BaseService.post(DisplayBoardInfo.config.url.dashboard.find, { dashboard: dashboardToEdit }).then(function(response) {
					 $scope.launchModal(response); 
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

			
//			$scope.launchEditModal = function(dashboard) {
//				$scope.dashboardToEdit = dashboard;
//				$scope.fetchPhysicians();
//				var modalInstance = $modal
//				.open({
//					templateUrl : '/displayboardinfo/view/dashboard/newDashboardModal.html',
//					controller : ModalInstanceCtrl,
//					resolve : {
//						physicians : function() {
//							return $scope.physicians;
//						},
//						dashboardToEdit : function() {
//							return $scope.dashboardToEdit;
//						}
//					}
//				});
//
//				modalInstance.result.then(function() {
//					$scope.reloadList();
//				});
//			};
			
			$scope.launchModal = function(dashboard) {
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
									return dashboard;
								}
							}
						});

				modalInstance.result.then(function() {
					$scope.reloadList();
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
				 
				 $scope.updateDashboard = function (dashboardToUpdate) {
					 BaseService.post(DisplayBoardInfo.config.url.dashboard.update, { dashboard: dashboardToUpdate }).then(function(response) {
						 $scope.reloadList();
						 $modalInstance.close();
					 }); 
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
					
					BaseService.post(DisplayBoardInfo.config.url.dashboard.save, { dashboard : $scope.dashboard }).then(function(response) {
						$scope.reloadList();
				    }); 
					
					$modalInstance.close();
				};

				$scope.cancelModal = function() {
					$modalInstance.dismiss('cancelled');
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
					name : 'kalendarz pyleń',
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
					$scope.dashboard.name = dashboardToEdit.dashboard.name;
					
					for (var i = 0; i < $scope.templates.length; i++){
						if($scope.templates[i].name==dashboardToEdit.dashboard.template)
						{
							$scope.dashboard.template = $scope.templates[i]; 
						}
					}
					
					for (var i = 0; i < dashboardToEdit.components.length; i++){
						if(dashboardToEdit.components[i].location=='west')
						{
							$scope.west.type = dashboardToEdit.components[i].type.name;
							$scope.west.config = dashboardToEdit.components[i].configuration; 
						}
						if(dashboardToEdit.components[i].location=='east')
						{
							$scope.east.type = dashboardToEdit.components[i].type.name;
							$scope.east.config = dashboardToEdit.components[i].configuration; 
						}
						if(dashboardToEdit.components[i].location=='north')
						{
							$scope.north.type = dashboardToEdit.components[i].type.name;
							$scope.north.config = dashboardToEdit.components[i].configuration; 
						}
						if(dashboardToEdit.components[i].location=='south')
						{
							$scope.south.type = dashboardToEdit.components[i].type.name;
							$scope.south.config = dashboardToEdit.components[i].configuration; 
						}
					}
				}
				else
				{
					$scope.variant = 'add';
				}
				
			};
		
			
		});
