package displayboardinfo

class SecurityFilters {
	def filters = {
		loginCheck(controller: '*', action: '*') {
			before = {
				if (session.user == null && !actionName.equals('authorize') && !request.forwardURI.equals('/displayboardinfo/')) {
					def x = request.forwardURI;
					response.sendError(401)
					return false
				}
			}
		}
	}
}


