package displayboardinfo

import static org.springframework.http.HttpStatus.*

import java.awt.Toolkit;

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class PhysicianController {

    def list() {
		render Physician.all as JSON;
	}

	@Transactional
	def save() {		
		Physician physicianInstance = request.JSON.physician;		
		try {
			physicianInstance.save();
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
			Physician toUpdate = Physician.find{physician -> id == json.physician.id};
			toUpdate.name = json.patient.name;
			toUpdate.surname = json.patient.surname;
			toUpdate.title = json.patient.title;
			toUpdate.speciality = json.patient.speciality;
			toUpdate.pesel = json.patient.pesel;
			toUpdate.user = json.patient.user;
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
			Physician toDelete = Physician.find{physician -> id == json.physician.id};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}	
}
