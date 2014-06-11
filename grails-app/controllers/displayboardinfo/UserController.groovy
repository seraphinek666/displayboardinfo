package displayboardinfo



import static org.springframework.http.HttpStatus.*
import java.awt.Toolkit;
import grails.converters.JSON
import grails.transaction.Transactional

@Transactional
class UserController {

	def list() {
		render User.all as JSON;
	}

	@Transactional
	def save() {
		User userInstance = request.JSON.user;		
		try {
			userInstance.save();
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
			User toUpdate = User.find{user -> id == json.user.id};
			toUpdate.login = json.user.login;
			toUpdate.userType = json.user.userType;
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
			User toDelete = User.find{user -> id == json.user.id};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}	
}
