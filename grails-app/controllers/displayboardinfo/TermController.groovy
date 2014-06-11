package displayboardinfo



import static org.springframework.http.HttpStatus.*

import java.sql.Timestamp;

import grails.transaction.Transactional

import java.awt.Toolkit;

import org.apache.ivy.core.event.download.StartArtifactDownloadEvent;

import grails.converters.deep.JSON

import groovy.ui.SystemOutputInterceptor;


@Transactional(readOnly = true)
class TermController {

    def listPhysEvents() {
		def json = request.JSON;
		Physician physicianToGet = Physician.find{physician -> id == json.physician_id};
		try {
			def terms = Term.findAll { t -> physician == physicianToGet};
		
			render terms as JSON;
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
	
	def listPhysEventsForToday() {
		def json = request.JSON;
		Physician physicianToGet = Physician.find{physician -> id == json.physician_id };
		try {
			def terms = Term.findAll { t -> physician == physicianToGet && completed == false && start >= new Date().clearTime() && end <= (new Date() +1)};
			render terms as JSON;
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
	
	def listRoomEvents() {
		def json = request.JSON;
		Room roomToGet = Room.find{room -> id == json.room_id};
		try {
			render Term.findAllByRoom(roomToGet) as JSON;
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}

	@Transactional
	def save() {		
		Term termInstance = request.JSON.term;		
		try {
			termInstance.save();
			event([namespace: 'browser', topic: "termAdded", data: [message: termInstance]]);
			render 'Success' 
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}

	@Transactional
	def update() {
		def json = request.JSON;
		try {
			Term toUpdate = Term.find{term -> id_term == json.term.id_term};
			Physician physician = Physician.find{physician -> id == json.term.physician.id};
			Patient patient = Patient.find{patient -> id == json.term.patient.id};
			Room room = Room.find{room -> id == json.term.room.id};
			
			toUpdate.start = new Timestamp(json.term.start);
			toUpdate.end = new Timestamp(json.term.end);
			toUpdate.title = json.term.title;
			toUpdate.physician = physician;
			toUpdate.room = room;
			toUpdate.patient = patient;
			toUpdate.allDay = json.term.allDay;
			toUpdate.completed = json.term.completed;
			toUpdate.save();
			
			if(json.term.completed) {
//				event for:'browser' , topic:'termClosed', data:[:]
				event([namespace: 'browser', topic: "termClosed", data: [message: toUpdate]]);
//				broadcaster['/atmosphere/test'].broadcast('Hello world!')
			}
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
	
	@Transactional
	def delete() {
		def json = request.JSON;
		try {
			Term toDelete = Term.find{term -> id_term == json.term.id_term};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
}
