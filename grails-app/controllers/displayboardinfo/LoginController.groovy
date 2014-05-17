package displayboardinfo

import grails.converters.JSON

class LoginController {
	def authorize() {
		def user = User.find {
			u -> login == request.JSON.loginCredentials.username && password == request.JSON.loginCredentials.password
		};
		if(user != null) {
			def responseData = ['userName' : request.JSON.loginCredentials.username]
			render responseData as JSON;
			return;
		}
		
		render 'Failure'
	}
}
