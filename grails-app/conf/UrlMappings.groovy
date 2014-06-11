class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
		
//		'/admin' {
//			controller = "redirect"
//			destination = "/login"
//		}
//	

        "/"(view:"/index")
        "500"(view:'/error')
		'/admin' (view: '/admin')
		'/client' (view: '/client')
		'/login' (view: '/login')
	}
	
	
	
}
