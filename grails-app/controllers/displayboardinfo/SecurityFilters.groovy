package displayboardinfo

class SecurityFilters {
	def filters = {
		loginCheck(controller: '*', action: '*') {
			before = {
				if (!session.user && !actionName.equals('authorize')) {
					response.sendError(401)
					return false
				}
			}
		}
	}
}


