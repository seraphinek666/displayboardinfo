package displayboardinfo



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

import java.awt.Toolkit;

import grails.converters.JSON
import groovy.ui.SystemOutputInterceptor;


@Transactional(readOnly = true)
class TermController {

    def listPhysEvents() {
		def json = request.JSON;
		Physician physicianToGet = Physician.find{physician -> id == json.physician_id};
		try {
			def terms = Term.findAllByPhysician(physicianToGet);
			/*for(t in terms){
				System.out.println("1 "+t.start);
				t.start = new Date((long)(t.start.getTime() + (t.start.getNanos() / 1000000)));
				t.end = new Date((long)(t.end.getTime() + (t.end.getNanos() / 1000000)));
				System.out.println("2 " + t.start);
			}*/
			render Term.findAllByPhysician(physicianToGet) as JSON;
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
	
	def listRoomEvents() {
		def json = request.JSON;
		Room roomToGet = Room.find{room -> id == json.room_id};
		try {
			//def terms = Term.findAllByRoom(roomToGet);
			/*for(t in terms){
				t.start = new Date((long)(t.start.getTime() + (t.start.getNanos() / 1000000)));
				t.end = new Date((long)(t.end.getTime() + (t.end.getNanos() / 1000000)));
			}*/
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
			Term toUpdate = Term.find{term -> id_term == json.term.id};
			toUpdate.start = json.term.start;
			toUpdate.end = json.term.end;
			toUpdate.title = json.term.title;
			toUpdate.physician = new Physician(json.term.physician)
			toUpdate.room = new Room(json.term.room)
			toUpdate.patient = new Patient(json.term.patient)
			toUpdate.allDay = json.term.allDay;
			toUpdate.save();
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
			Term toDelete = Term.find{term -> id == json.term.id};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
}
