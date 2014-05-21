app.controller('TablesController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore) {

	$scope.physicians = [];
	$scope.patients = [];
	$scope.rooms = [];
	
	$scope.selectedPhysicianID = -1;
	$scope.selectedRoomID = -1;
	$scope.selectedPatientID = -1;
	
	$scope.physicianEvents = [];
	$scope.roomEvents = [];
	
	$scope.fetchPhysicians = function() {
		BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
			 $scope.physicians = response;
			 $scope.physicians = $scope.physicians.sort('surname');
			});
	};
	
	$scope.fetchPatients = function() {
		BaseService.post(DisplayBoardInfo.config.url.patient.list).then(function(response) {
			 $scope.patients = response;
			 $scope.patients = $scope.patients.sort('surname');
		});
	};
	
	$scope.fetchRooms = function() {
		BaseService.post(DisplayBoardInfo.config.url.room.list).then(function(response) {
			 $scope.rooms = response;
			 $scope.rooms = $scope.rooms.sort('number');
		});
	};
	
	$scope.setSelectedPhysicianID = function(selectedPhysician){
		if(typeof selectedPhysician === 'undefined'){
			$scope.selectedPhysicianID = -1;
		} else {
			$scope.selectedPhysicianID = selectedPhysician;
		}
	}
	
	$scope.setSelectedPatientID = function(selectedPatient){
		if(typeof selectedPatient === 'undefined'){
			$scope.selectedPatientID = -1;
		} else {
			$scope.selectedPatientID = selectedPatient;
		}
	}
	
	$scope.setSelectedRoomID = function(selectedRoom){
		if(typeof selectedRoom === 'undefined'){
			$scope.selectedRoomID = -1;
		} else {
			$scope.selectedRoomID = selectedRoom;
		}
	}
	
	$scope.fetchPhysicians();
	$scope.fetchPatients();
	$scope.fetchRooms();
	
	$scope.test = function() {
		console.log('test');
	}
	
	$scope.fetchPhysicianEvents = function(physicianID) {
		if(typeof physicianID === 'undefined'){
			$scope.physicianEvents = [];
		} else {
			BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
			 //$scope.physicianEvents = response;
				/*$scope.physicianEvents = [
				  	                 { patient_id:1, physician_id:1, room_id:1,
				  	                   start_date: new Date(2014, 4, 20),
				  	                   end_date: new Date(2014, 4, 21) },
				  	                 { patient_id:1, physician_id:2, room_id:1,
				  	                   start_date: new Date(2014, 4, 21 ),
				  	                   end_date: new Date(2014, 4, 22 ) }
				  	               ];*/
				$scope.physicianEvents = [
				  	                 { id:1, text:"physician A-12458",
				  	                   start_date: new Date(2014, 4, 20),
				  	                   end_date: new Date(2014, 4, 21) },
				  	                 { id:2, text:"physician A-83473",
				  	                   start_date: new Date(2014, 4, 21 ),
				  	                   end_date: new Date(2014, 4, 22 ) }
				  	               ];
				});
		}
	}
	
	$scope.fetchRoomEvents = function(roomID) {
		if(typeof roomID === 'undefined'){
			$scope.roomEvents = [];
		} else {
			BaseService.post(DisplayBoardInfo.config.url.physician.list).then(function(response) {
				//$scope.roomEvents = response;
				$scope.roomEvents = [
				  	                 { id:1, text:"Room A-12458",
				  	                   start_date: new Date(2014, 4, 20),
				  	                   end_date: new Date(2014, 4, 21) },
				  	                 { id:2, text:"Room A-83473",
				  	                   start_date: new Date(2014, 4, 21 ),
				  	                   end_date: new Date(2014, 4, 22 ) }
				  	               ];
				});
		}
	}
	
	
	
});

app.directive('dhxScheduler', function() {
	  return {
	    restrict: 'A',
	    scope: false,
	    transclude: true,
	    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',

	    link:function ($scope, $element, $attrs, $controller){
	      //default state of the scheduler
	      if (!$scope.scheduler)
	        $scope.scheduler = {};
	      $scope.scheduler.mode = $scope.scheduler.mode || "month";
	      $scope.scheduler.date = $scope.scheduler.date || new Date();

	      //watch data collection, reload on changes
	      $scope.$watch($attrs.data, function(collection){
	        scheduler.clearAll();
	        scheduler.parse(collection, "json");
	      }, true);

	      //mode or date
	      $scope.$watch(function(){
	        return $scope.scheduler.mode + $scope.scheduler.date.toString();
	      }, function(nv, ov) {
	        var mode = scheduler.getState();
	        if (nv.date != mode.date || nv.mode != mode.mode)
	          scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
	      }, true);

	      //size of scheduler
	      $scope.$watch(function() {
	        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
	      }, function() {
	        scheduler.setCurrentView();
	      });

	      //styling for dhtmlx scheduler
	      $element.addClass("dhx_cal_container");

	      //init scheduler
	      scheduler.init($element[0], $scope.scheduler.date, $scope.scheduler.mode);
	    }
	  }
	});

app.directive('dhxTemplate', ['$filter', function($filter){
	  scheduler.aFilter = $filter;

	  return {
	    restrict: 'AE',
	    terminal:true,
	   
	    link:function($scope, $element, $attrs, $controller){
	      $element[0].style.display = 'none';

	      var template = $element[0].innerHTML;
	      template = template.replace(/[\r\n]/g,"").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function(match, prop){
	        if (prop.indexOf("|") != -1){
	          var parts = prop.split("|");
	          return "\"+scheduler.aFilter('"+(parts[1]).trim()+"')(event."+(parts[0]).trim()+")+\"";
	        }
	        return '"+event.'+prop+'+"';
	      });
	      var templateFunc = Function('sd','ed','event', 'return "'+template+'"');
	      scheduler.templates[$attrs.dhxTemplate] = templateFunc;
	    }
	  };
	}]);