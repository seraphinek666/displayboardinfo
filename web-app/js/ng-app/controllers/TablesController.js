app.controller('TablesController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore, $modal) {

	$scope.physicians = [];
	$scope.patients = [];
	$scope.rooms = [];

	$scope.selectedPhysician = null;
	$scope.selectedRoom = null;
	$scope.selectedPatient = null;
	
	$scope.selectedEvent = null;
	$scope.physicianEvents = [];
	$scope.roomEvents = [];
	
	$scope.canEditDelete = false;

	$scope.physicianEventsSource = {
			color: 'green',
			textColor: 'white',
			events:[]
	}
	
	$scope.roomEventsSource = {
			color: 'DarkViolet',
			textColor: 'white',
			events: []
	};
	
	//#########################################################################################

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
	
	$scope.fetchPhysicians();
	$scope.fetchPatients();
	$scope.fetchRooms();
	
	//#########################################################################################

	$scope.setSelectedPhysician = function(selectedPhysician){
		if(typeof selectedPhysician === 'undefined'){
			$scope.selectedPhysician = null;
			$scope.physicianEventsSource.events = []
		} else {
			$scope.selectedPhysician = selectedPhysician;
		}
	}
	
	$scope.setSelectedRoomID = function(selectedRoom){
		if(typeof selectedRoom === 'undefined'){
			$scope.selectedRoom = null;
			$scope.roomEventsSource.events = []
		} else {
			$scope.selectedRoom = selectedRoom;
		}
	}

	$scope.setSelectedPatient = function(selectedPatient){
		if(typeof selectedPatient === 'undefined'){
			$scope.selectedPatient = null;
		} else {
			$scope.selectedPatient = selectedPatient;
		}
	}

	//#########################################################################################

	$scope.fetchRoomEvents = function(room) {
		if(typeof room === 'undefined'){
			$scope.roomEvents = [];
		} else {
			BaseService.post(DisplayBoardInfo.config.url.term.listRoomEvents, { room_id: room.id}).then(function(response) {
				//$scope.roomEventsSource.events = response;
				for (r in response){
					$scope.roomEventsSource.events.push(r);
				}
				console.log($scope.roomEventsSource.events);
			});
		}
	};
	
	$scope.fetchPhysicianEvents = function(physician) {
		if(typeof physician === 'undefined'){
			$scope.physicianEvents = [];
		} else {
			BaseService.post(DisplayBoardInfo.config.url.term.listPhysEvents, { physician_id: physician.id }).then(function(response) {
				//$scope.physicianEventsSource.events = response;
				console.log(response);
				for (r in response) {
					$scope.physicianEventsSource.events.push(r);
				}
				console.log($scope.physicianEventsSource.events);
			});
		}
	};
	
	//#########################################################################################

	$scope.uiConfig = {
			calendar:{
				height: 800,
				editable: true,
				slotMinutes: 15,
				header:{
					left: 'agendaDay, agendaWeek, month',
					center: 'title',
					right: 'today prev,next'
				},
				selectable: true,
				selectHelper: true,
				select: function(start, end, allDay) {
					//var title = prompt('Event Title:');
					/*if (true) {
						$scope.myCalendar1.fullCalendar('renderEvent',
							{
								start: start,
								end: end,
								allDay: allDay
							}
						);
					}
					$scope.myCalendar1.fullCalendar('unselect');*/
					$scope.saveEvent(start, end, allDay);
				},
				axisFormat: 'HH:mm',
				timeFormat: {
				    agenda: 'H:mm{ - H:mm}'
				},
				monthNames:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],
				monthNamesShort:["Sty","Lut","Marz","Kwie","Maj","Czer","Lip","Sier","Wrze","Paź","Lis","Gru"],
				dayNames:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],
				dayNamesShort:["Niedz","Pon","Wt","Śr","Czw","Pt","Sob"],
				eventClick: function(event, allDay, jsEvent, view, dupa ){
					event.color = 'red';
					event.textColor = 'yellow';
					$scope.myCalendar1.fullCalendar('updateEvent', event);
					$scope.selectedEvent = event;
					$scope.canEditDelete = true;
					console.log(event);
				},
				eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
					
				},
				eventResize: function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
					
				}
			}
	};
	
	$scope.saveEvent = function(start, end, allDay){
		$scope.termToSave = {
				title: $scope.getEventTitle($scope.selectedPhysician.id, $scope.selectedRoom.id, $scope.selectedPatient.id), 
				physician: $scope.selectedPhysician, 
				room: $scope.selectedRoom, 
				patient: $scope.selectedPatient, 
				start: start.getTime(), 
				end: end.getTime(), 
				allDay: allDay
		};
		
		BaseService.post(DisplayBoardInfo.config.url.term.save, { term: $scope.termToSave }).then(function(response) {
			$scope.fetchPhysicianEvents($scope.selectedPhysician);
			$scope.fetchRoomEvents($scope.selectedRoom);
		});
	}
	
	$scope.getEventTitle = function(physicianID, roomID, patientID) {
		return $scope.getPhysicianDescription(physicianID)+"; "
			+$scope.getPatientPesel(patientID)+"; "+$scope.getRoomDescription(roomID)
	}
	
	$scope.getPhysicianDescription = function(physicianID){
		for (i=0; i<$scope.physicians.length; i++){
			if($scope.physicians[i].id == physicianID){
				return $scope.physicians[i].title+" "+$scope.physicians[i].name+" "+$scope.physicians[i].surname; 
			} 
		 }
		 
		 return 'Błąd - brak lekarza'
	}
	
	$scope.getRoomDescription = function(roomID){
		for (i=0; i<$scope.rooms.length; i++){
			if($scope.rooms[i].id == roomID){
				return $scope.rooms[i].number+" /piętro "+$scope.rooms[i].floor; 
			} 
		 }
		 
		 return 'Błąd - brak pokoju'
	}
	
	$scope.getPatientDescription = function(patientID){
		for (i=0; i<$scope.patients.length; i++){
			if($scope.patients[i].id == patientID){
				return $scope.patients[i].surname+" "+$scope.patients[i].name; 
			} 
		 }
		 
		 return 'Błąd - brak pacjenta'
	}
	
	$scope.getPatientPesel = function(patientID){
		for (i=0; i<$scope.patients.length; i++){
			if($scope.patients[i].id == patientID){
				return $scope.patients[i].pesel; 
			} 
		 }
		 
		 return 'Błąd - brak pacjenta'
	}
	
	
	
	
	
	
	
	
	
	$scope.launchModal = function () {
		$scope.fetchPhysicians();
		$scope.fetchPatients();
		$scope.fetchRooms();
		
	    var modalInstance = $modal.open({
	      templateUrl: '/displayboardinfo/view/tables/editTermModal.html',
	      controller: ModalInstanceCtrl,
	      resolve: {
	    	  selectedEvent : function(){
	    		  return $scope.selectedEvent;
	    	  },
	    	  physicians : function(){
	    		  return $scope.physicians;
	    	  },
	    	  patients : function(){
	    		  return $scope.patients;
	    	  },
	    	  rooms : function(){
	    		  return $scope.rooms;
	    	  }
	      }
	    });
	    
	    modalInstance.result.then(function ($term) {
	    	$scope.reloadList()
	    });
	  };
	  
	var ModalInstanceCtrl = function ($scope, $modalInstance, selectedEvent, physicians, patients, rooms) {
			$scope.term = {id_term : selectedEvent.id_term, title: selectedEvent.title, physician_id: selectedEvent.physician_id, 
					room_id: selectedEvent.room_id, patient_id: selectedEvent.patient_id, start: selectedEvent.start, end: selectedEvent.end, allDay: selectedEvent.allDay};
			$scope.selectedEvent = selectedEvent;
			$scope.physicians = physicians;
			$scope.patients = patients;
			$scope.rooms = rooms;
			
			$scope.saveTerm = function () {
				$scope.term.title = $scope.getPhysicianDescription($scope.term.physician_id)+"; "
					+$scope.getPatientPesel($scope.term.patient_id)+"; "+$scope.getRoomDescription($scope.term.room_id)
				$modalInstance.close($scope.term);
				BaseService.post(DisplayBoardInfo.config.url.term.update, { term: $scope.term}).then(function(response) {
				});
			};
	
			$scope.cancelModal = function () {$modalInstance.dismiss('cancelled')};
			
			$scope.getPhysicianDescription = function(physicianID){
				for (i=0; i<$scope.physicians.length; i++){
					if($scope.physicians[i].id == physicianID){
						return $scope.physicians[i].title+" "+$scope.physicians[i].name+" "+$scope.physicians[i].surname; 
					} 
				 }
				 
				 return 'Błąd - brak lekarza'
			}
			
			$scope.getRoomDescription = function(roomID){
				for (i=0; i<$scope.rooms.length; i++){
					if($scope.rooms[i].id == roomID){
						return $scope.rooms[i].number+" /piętro "+$scope.rooms[i].floor; 
					} 
				 }
				 
				 return 'Błąd - brak pokoju'
			}
			
			$scope.getPatientDescription = function(patientID){
				for (i=0; i<$scope.patients.length; i++){
					if($scope.patients[i].id == patientID){
						return $scope.patients[i].surname+" "+$scope.patients[i].name; 
					} 
				 }
				 
				 return 'Błąd - brak pacjenta'
			}
			
			$scope.getPatientPesel = function(patientID){
				for (i=0; i<$scope.patients.length; i++){
					if($scope.patients[i].id == patientID){
						return $scope.patients[i].pesel; 
					} 
				 }
				 
				 return 'Błąd - brak pacjenta'
			}
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
	/* add custom event */
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

	$scope.eventSources = [$scope.roomEventsSource, $scope.physicianEventsSource];


});