app.controller('DayScheduleController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $filter, ngTableParams, $modal, toaster) {

	$scope.physicians = [];
	$scope.physicianEvents = [];
	$scope.physicianEventsLocal = [];
	
	$scope.selectedPhysician = null;
	$scope.patients = [];
	$scope.rooms = [];
	$scope.currentDay = new Date().toISOString().slice(0,10);
	
	$scope.reloadList = function() {
		BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
			 $scope.patients = response;
			 $scope.tableParams.reload();
			});
	}
	
	$scope.fetchPhysicians = function() {
		BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
			$scope.physicians = response;
		});
	};
	
	$scope.fetchPatients = function() {
		BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
			$scope.patients = response;
		});
	};

	$scope.fetchRooms = function() {
		BaseService.post(DisplayBoardInfo.config.url.room.list).then(function(response) {
			$scope.rooms = response;
		});
	};
	
	$scope.fetchPhysicians();
	$scope.fetchPatients();
	$scope.fetchRooms();
	
	$scope.fetchEvents = function(physicianID){
		date = new Date();
		BaseService.post(DisplayBoardInfo.config.url.term.listPhysEvents, {physician_id: physicianID.id}).then(function(response) {
			 
			 $scope.physicianEvents = [];
			 var counter = 0;
			 var currentDate = new Date();
			 var upDateThreshold = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1); 
			 var bottomDateThreshold = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
			 for (i=0; i<response.length; i++) {
				 if ((new Date(response[i].end).getTime() <= upDateThreshold.getTime()) &&
						 (new Date(response[i].end).getTime() >= bottomDateThreshold.getTime())){
					 $scope.physicianEvents.push(response[i]);
					 $scope.physicianEvents[counter].start = new Date($scope.physicianEvents[counter].start);
					 $scope.physicianEvents[counter].end = new Date($scope.physicianEvents[counter].end);
					 
					 $scope.physicianEvents[counter].startDate = $scope.physicianEvents[counter].start.toISOString().slice(0,10);
					 $scope.physicianEvents[counter].endDate = $scope.physicianEvents[counter].end.toISOString().slice(0,10);
					 $scope.physicianEvents[counter].startTime = $scope.physicianEvents[counter].start.toTimeString().slice(0,8);
					 $scope.physicianEvents[counter].endTime = $scope.physicianEvents[counter].end.toTimeString().slice(0,8);
					 counter = counter + 1
				 }
			 }
			 $scope.tableParams.reload();
			});
	}

	 $scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        sorting: {
	        	startTime: 'asc'     // initial sorting
	        }
	    }, {
	        total: $scope.physicianEvents.length, // length of data
	        getData: function($defer, params) {
	            var orderedData = params.sorting() ?
	                    $filter('orderBy')($scope.physicianEvents, params.orderBy()) :
	                    	$scope.physicianEvents;

	            $scope.physicianEventsLocal = orderedData;       
	            params.total($scope.physicianEventsLocal.length); // set total for recalc

	            $scope.physicianEventsLocal = $scope.physicianEventsLocal.slice((params.page() - 1) * params.count(), params.page() * params.count());
	            $defer.resolve($scope.physicianEventsLocal.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	 });
	 
	 $scope.getPatientObject = function(id) {
		 for (i=0; i<$scope.patients.length; i++){
			if($scope.patients[i].id == id){
				return $scope.patients[i]; 
			} 
		 }
	 }
	 
	 $scope.getRoomObject = function(id) {
		 for (i=0; i<$scope.rooms.length; i++){
			if($scope.rooms[i].id == id){
				return $scope.rooms[i]; 
			} 
		 }
	 }
	 
	 $scope.closeEvent = function (event) {
		 $scope.term = {
					id_term : event.id_term, 
					title: event.title, 
					physician: event.physician, 
					room: event.room, 
					patient: event.patient, 
					start: event.start.getTime(), 
					end: event.end.getTime(), 
					allDay: event.allDay,
					completed: !event.completed
			};
		 
		 BaseService.post(DisplayBoardInfo.config.url.term.update, { term: $scope.term}).then(function(response) {
			 
	     });
	 };

});