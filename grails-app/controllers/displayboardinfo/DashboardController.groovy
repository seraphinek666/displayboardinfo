package displayboardinfo

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.JSON

@Transactional(readOnly = true)
class DashboardController {

	/**
	 * Po długich bojach udało mi się dokończyć podstawowy mechanizm dodawania tych dashboard'ów.
Powinno teraz sypać POST'em z JSONEM w postaci:

{"name":"nowy","components":[{"location":"west","type":"zegar","config":""},{"location":"east","type":"lekarz","config":2}],"template":{"name":"template1","url":"/displayboardinfo/view/dashboard/dashboard_template1.html"}}

Mamy: nazwa całego panelu, później komponenty i ich type i config. Config to po prostu id lekarza albo id gabinetu, dla zegarka i reklamy pozostaje puste pole. Można później dorobić różne rodzaje zegarków to wtedy też będzie przesyłało id. Komponentów jest tyle na ile jest podzielony template. W sekcji template mamy jego nazwę i url (url jest mi potrzebny do działania, później przy zapisie do bazy można go pominąć, wystarczy sama jego nazwa).
Sama nazwa poszczególnych komponentów wydaje mi się zbędna. Będzie generowane coś w stylu Gabinet + nr, Lekarz + nazwa itd.

Potrzebuję metod do zapisu do bazy i do pobrania z bazy dashboardów. Jak to będzie to dorobię ich wyświetlanie na liście i usuwanie. Jeśli edycja nie będzie zbyt trudna to też ją zrobię. 
	 */
	
	
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Dashboard.list(params), model:[dashboardInstanceCount: Dashboard.count()]
    }

    def show(Dashboard dashboardInstance) {
        respond dashboardInstance
    }

    def create() {
        respond new Dashboard(params)
    }

    @Transactional
    def save() {
		def json = request.JSON.dashboard;
		Dashboard dashboard = new Dashboard();

		System.out.println(json);

		dashboard.name = json.name;
		dashboard.template = json.template.name;
		dashboard.components = new HashMap<String, Component>();
		for(component in json.components) {
			Component componentToSave = new Component();
			componentToSave.type = component.type;
			componentToSave.configuration = component.configuration;
			componentToSave.save();
			dashboard.components.put(component.location, componentToSave);			
		}
		dashboard.save();
    }

	def getDashboardById() {
		int idDashboard = request.JSON.id;
		render Dashboard.findBy { d -> id == idDashboard } as JSON;
	}
	
    def edit(Dashboard dashboardInstance) {
        respond dashboardInstance
    }

    @Transactional
    def update(Dashboard dashboardInstance) {
        if (dashboardInstance == null) {
            notFound()
            return
        }

        if (dashboardInstance.hasErrors()) {
            respond dashboardInstance.errors, view:'edit'
            return
        }

        dashboardInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Dashboard.label', default: 'Dashboard'), dashboardInstance.id])
                redirect dashboardInstance
            }
            '*'{ respond dashboardInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Dashboard dashboardInstance) {

        if (dashboardInstance == null) {
            notFound()
            return
        }

        dashboardInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Dashboard.label', default: 'Dashboard'), dashboardInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'dashboardInstance.label', default: 'Dashboard'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
