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
	def delete() {
		Patient patientInstance = request.JSON.patient;
		try {
			Patient toDelete = Patient.find{patient -> id == patientInstance.id};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}	
}
