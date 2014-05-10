package displayboardinfo



import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserController {

	def list() {
		render User.all as JSON;
	}

	@Transactional
	def save(User userInstance) {
		try {
			userInstance.save(flush:true);
			render 'Success' as JSON
		} catch (Exception e) {
			response.status = 500
			render 'Failure' as JSON
		}
	}

	@Transactional
	def delete(User userInstance) {
		try {
			userInstance.delete(flush:true);
			render 'Success' as JSON
		} catch (Exception e) {
			response.status = 500
			render 'Failure' as JSON
		}
	}	
}
