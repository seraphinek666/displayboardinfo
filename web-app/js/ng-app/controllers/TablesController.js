app.controller('TablesController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore) {

	$scope.physicians = [];
	$scope.patients = [];
	$scope.rooms = [];
	
	$scope.selectedPhysicianID = -1;
	$scope.selectedRoomID = -1;
	$scope.selectedPatientID = -1;
	
	$scope.physicianEvents = [];
	$scope.roomEvents = [];
	$scope.test2 = [];
	
	
	
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
			BaseService.post(DisplayBoardInfo.config.url.room.list).then(function(response) {
				//$scope.roomEvents = response;
				$scope.physicianEvents = [
				  	                 { id:1, text:"Room0 A-12458",
				  	                   start_date: new Date(2014, 4, 20),
				  	                   end_date: new Date(2014, 4, 21) },
				  	                 { id:2, text:"Room1 A-83473",
				  	                   start_date: new Date(2014, 4, 21 ),
				  	                   end_date: new Date(2014, 4, 22 ) },
					  	                 { id:3, text:"Room2 A-83473",
					  	                   start_date: new Date(2014, 4, 22 ),
					  	                   end_date: new Date(2014, 4, 23 ) }
				  	               ];
				});
		}
	}
	
	$scope.events = [
	       	      {title: 'All Day Event',start: new Date(y, m, 1)},
	       	      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	       	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	       	      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	       	      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	       	      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
	       	    ];
	
	$scope.uiConfig = {
		      calendar:{
		        height: 800,
		        editable: true,
		        header:{
		          left: 'title',
		          center: '',
		          right: 'today prev,next'
		        },
		        selectable: true,
				selectHelper: true,
				select: function(start, end, allDay) {
					var title = prompt('Event Title:');
					if (title) {
						calendar.fullCalendar('renderEvent',
							{
								title: title,
								start: start,
								end: end,
								allDay: allDay
							},
							true // make the event "stick"
						);
					}
					calendar.fullCalendar('unselect');
				},
		        eventClick: $scope.alertOnEventClick,
		        eventDrop: $scope.alertOnDrop,
		        eventResize: $scope.alertOnResize
		      }
		    };
	
	
	    var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
	    
	    $scope.changeTo = 'Hungarian';
	    /* event source that pulls from google.com */
	    $scope.eventSource = {
	    		color: '#f00',
	 	       textColor: 'white',
	 	       events: [ 
	 	          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
	 	          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
	 	          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
	 	        ]
	    };
	    /* event source that contains custom events on the scope */
	    
	    /* event source that calls a function on every view switch */
	    $scope.eventsF = function (start, end, callback) {
	      var s = new Date(start).getTime() / 1000;
	      var e = new Date(end).getTime() / 1000;
	      var m = new Date(start).getMonth();
	      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	      callback(events);
	    };

	    $scope.calEventsExt = {
	       color: '#f00',
	       textColor: 'yellow',
	       events: [ 
	          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
	          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
	          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
	        ]
	    };
	    /* alert on eventClick */
	    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
	        $scope.alertMessage = (event.title + ' was clicked ');
	        console.log(event);
	    };
	    /* alert on Drop */
	     $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
	       $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
	    };
	    /* alert on Resize */
	    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
	       $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
	    };
	    /* add and removes an event source of choice */
	    $scope.addRemoveEventSource = function(sources,source) {
	      var canAdd = 0;
	      angular.forEach(sources,function(value, key){
	        if(sources[key] === source){
	          sources.splice(key,1);
	          canAdd = 1;
	        }
	      });
	      if(canAdd === 0){
	        sources.push(source);
	      }
	    };
	    /* add custom event*/
	    $scope.addEvent = function() {
	      $scope.events.push({
	        title: 'Open Sesame',
	        start: new Date(y, m, 28),
	        end: new Date(y, m, 29),
	        className: ['openSesame']
	      });
	    };
	    /* remove event */
	    $scope.remove = function(index) {
	      $scope.events.splice(index,1);
	    };
	    /* Change View */
	    $scope.changeView = function(view,calendar) {
	      calendar.fullCalendar('changeView',view);
	    };
	    /* Change View */
	    $scope.renderCalender = function(calendar) {
	      calendar.fullCalendar('render');
	    };
	    /* config object */
	    

	    $scope.changeLang = function() {
	      if($scope.changeTo === 'Hungarian'){
	        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
	        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
	        $scope.changeTo= 'English';
	      } else {
	        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	        $scope.changeTo = 'Hungarian';
	      }
	    };
	    /* event sources array*/
	    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
	    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
	
	
});

/*app.directive('dhxScheduler', function() {
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
	}]);*/