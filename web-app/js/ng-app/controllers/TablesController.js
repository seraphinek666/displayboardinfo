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
			className: '1',
			events:[]
	}
	
	$scope.roomEventsSource = {
			color: 'DarkViolet',
			textColor: 'white',
			className: '2',
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
		if(typeof selectedPhysician === 'undefined' || selectedPhysician === null){
			$scope.selectedPhysician = null;
			$scope.physicianEventsSource.events = []
		} else {
			$scope.selectedPhysician = selectedPhysician;
		}
	}
	
	$scope.setSelectedRoomID = function(selectedRoom){
		if(typeof selectedRoom === 'undefined' || selectedRoom === null){
			$scope.selectedRoom = null;
			$scope.roomEventsSource.events = []
		} else {
			$scope.selectedRoom = selectedRoom;
		}
	}

	$scope.setSelectedPatient = function(selectedPatient){
		if(typeof selectedPatient === 'undefined' || selectedPatient === null){
			$scope.selectedPatient = null;
		} else {
			$scope.selectedPatient = selectedPatient;
		}
	}

	//#########################################################################################

	$scope.fetchRoomEvents = function(room) {
		if(typeof room === 'undefined' || room === null){
			$scope.roomEventsSource.events = [];
		} else {
			BaseService.post(DisplayBoardInfo.config.url.term.listRoomEvents, { room_id: room.id}).then(function(response) {
				$scope.roomEventsSource.events = response;
				for (i=0; i<response.length; i++) {
					$scope.roomEventsSource.events[i].id = i;
					$scope.roomEventsSource.events[i].start = new Date($scope.roomEventsSource.events[i].start);
					$scope.roomEventsSource.events[i].end = new Date($scope.roomEventsSource.events[i].end);
				}
			});
		}
		
		$scope.selectedEvent = null;
	};
	
	$scope.fetchPhysicianEvents = function(physician) {
		if(typeof physician === 'undefined' || physician === null){
			$scope.physicianEventsSource.events = [];
		} else {
			BaseService.post(DisplayBoardInfo.config.url.term.listPhysEvents, { physician_id: physician.id }).then(function(response) {
				$scope.physicianEventsSource.events = response;
				for (i=0; i<response.length; i++) {
					$scope.physicianEventsSource.events[i].id = i+100000;
					$scope.physicianEventsSource.events[i].start = new Date($scope.physicianEventsSource.events[i].start);
					$scope.physicianEventsSource.events[i].end = new Date($scope.physicianEventsSource.events[i].end);
				}
			});
		}
		
		$scope.selectedEvent = null;
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
					if (($scope.selectedPhysician === null || $scope.selectedPatient === null || $scope.selectedRoom === null)
							|| (typeof $scope.selectedPhysician === 'undefined' || typeof $scope.selectedPatient === 'undefined' || typeof $scope.selectedRoom === 'undefined')){
						$scope.myCalendar1.fullCalendar('unselect');
						$scope.selectedEvent = null;
						alert('Aby dodać wizytę należy wybrać lekarza, pacjenta i gabinet');
					} else {
						$scope.myCalendar1.fullCalendar('unselect');
						$scope.saveEvent(start, end, allDay);
						$scope.selectedEvent = null;
					}
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
				},
				eventDrop: function(event, allDay, jsEvent, ui, view){
					$scope.updateEvent(event, allDay, jsEvent, ui, view);
					$scope.selectedEvent = null;
				},
				eventResize: function(event, allDay, jsEvent, ui, view){
					$scope.updateEvent(event, allDay, jsEvent, ui, view);
					$scope.selectedEvent = null;
				}
			}
	};
	
	$scope.eventSources = [$scope.roomEventsSource, $scope.physicianEventsSource];
	
	//#########################################################################################
	
	$scope.updateEvent = function(event, allDay, jsEvent, ui, view){
		$scope.termToUpdate = {
				id_term : event.id_term, 
				title: event.title, 
				physician: event.physician, 
				room: event.room, 
				patient: event.patient, 
				start: event.start.getTime(), 
				end: event.end, 
				allDay: event.allDay
		};
		
		if ($scope.termToUpdate.end == null){
			$scope.termToUpdate.end = $scope.termToUpdate.start
		} else {
			$scope.termToUpdate.end = $scope.termToUpdate.end.getTime();
		}
		
		BaseService.post(DisplayBoardInfo.config.url.term.update, { term: $scope.termToUpdate}).then(function(response) {
			$scope.fetchPhysicianEvents($scope.selectedPhysician);
			$scope.fetchRoomEvents($scope.selectedRoom);
		});
	}
	
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
	
	$scope.removeEvent = function(){
		if($scope.selectedEvent == null) {
			alert('Proszę najpierw zaznaczyć wydarzenie.');
		} else {
			var remove = window.confirm('Czy napewno chcesz usunąć zdarzenie?');
			if (remove == true) 
			{
				BaseService.post(DisplayBoardInfo.config.url.term.remove, { term: $scope.selectedEvent }).then(function(response) {
					$scope.fetchPhysicianEvents($scope.selectedPhysician);
					$scope.fetchRoomEvents($scope.selectedRoom);
				}); 
			}
			$scope.selectedEvent = null;
		}
	}
	
	//#########################################################################################
	
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
	
	//#########################################################################################
	
	$scope.launchModal = function () {
		/*$scope.fetchPhysicians();
		$scope.fetchPatients();
		$scope.fetchRooms();*/
		if($scope.selectedEvent == null) {
			alert('Proszę najpierw zaznaczyć wydarzenie.');
		} else {
		
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
		    	$scope.fetchPhysicianEvents($scope.selectedPhysician);
				$scope.fetchRoomEvents($scope.selectedRoom);
		    });
		}
	  };
	  
	var ModalInstanceCtrl = function ($scope, $modalInstance, selectedEvent, physicians, patients, rooms) {
			$scope.selectedEvent = selectedEvent;
			$scope.physicians = physicians;
			$scope.patients = patients;
			$scope.rooms = rooms;
			
			$scope.term = {
					id_term : selectedEvent.id_term, 
					title: selectedEvent.title, 
					physician: selectedEvent.physician, 
					room: selectedEvent.room, 
					patient: selectedEvent.patient, 
					start: selectedEvent.start.getTime(), 
					end: selectedEvent.end, 
					allDay: selectedEvent.allDay
			};
			
			$scope.saveTerm = function () {
				$scope.term.title = $scope.getPhysicianDescription($scope.term.physician.id)+"; "
					+$scope.getPatientPesel($scope.term.patient.id)+"; "+$scope.getRoomDescription($scope.term.room.id)
				if ($scope.term.end == null){
					$scope.term.end = $scope.term.start
				} else {
					$scope.term.end = $scope.term.end.getTime()
				}
				$modalInstance.close($scope.term);
				BaseService.post(DisplayBoardInfo.config.url.term.update, { term: $scope.term }).then(function(response) {
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

});