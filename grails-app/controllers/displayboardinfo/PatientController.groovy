package displayboardinfo



import static org.springframework.http.HttpStatus.*

import java.awt.Toolkit;

import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class PatientController {

    def list() {
		render Patient.all as JSON;
	}

	@Transactional
	def save() {		
		Patient patientInstance = request.JSON.patient;		
		try {
			patientInstance.save();
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
			Patient toUpdate = Patient.find{patient -> id == json.patient.id};
			toUpdate.name = json.patient.name;
			toUpdate.surname = json.patient.surname;
			toUpdate.pesel = json.patient.pesel;
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
			Patient toDelete = Patient.find{patient -> id == json.patient.id};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}	
}
