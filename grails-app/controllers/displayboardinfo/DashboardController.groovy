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


	def list() {
		render Dashboard.all as JSON;
	}

	@Transactional
	def save() {
		def json = request.JSON.dashboard;
		Dashboard dashboard = new Dashboard();

		System.out.println(json);

		dashboard.name = json.name;
		dashboard.template = json.template.name;
		dashboard.save();

		for(component in json.components) {
			Component componentToSave = new Component();
			componentToSave.type = component.type;
			componentToSave.configuration = component.config;
			componentToSave.dashboard = dashboard;
			componentToSave.save();
		}
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
				flash.message = message(code: 'default.updated.message', args: [
					message(code: 'Dashboard.label', default: 'Dashboard'),
					dashboardInstance.id
				])
				redirect dashboardInstance
			}
			'*'{ respond dashboardInstance, [status: OK] }
		}
	}

	@Transactional
	def delete() {
		int idDashboard = request.JSON.id;
		Dashboard dashboard =  Dashboard.findBy { d -> id == idDashboard } as JSON;
		dashboard.delete();
		render 'Success' as JSON
	}
}
