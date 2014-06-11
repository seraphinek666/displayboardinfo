package displayboardinfo

class SecurityFilters {
	def filters = {
		loginCheck(controller: '*', action: '*') {
			before = {
				def x = request.forwardURI;
				def d = request.getHeader('referer');
				
				if (session.user == null && !actionName.equals('authorize') && !request.forwardURI.equals('/displayboardinfo/') && !d.contains('/displayboardinfo/client/')&& !d.contains('/displayboardinfo/dashboard/list/')) {
					response.sendError(401)
					return false
				}
			}
		}
	}
}


