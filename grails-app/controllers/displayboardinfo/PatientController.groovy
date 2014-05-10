package displayboardinfo



import static org.springframework.http.HttpStatus.*
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
			patientInstance.save(flush:true);
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
			patientInstance.delete(flush:true);
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}	
}
