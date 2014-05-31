package displayboardinfo

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.JSON

@Transactional(readOnly = true)
class DashboardController {

	def list() {
		render Dashboard.all as JSON;
	}

	@Transactional
	def save() {
		def json = request.JSON.dashboard;
		Dashboard dashboard = new Dashboard();
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
		
		System.out.println("test");
		int idDashboard = request.JSON.id;
		Dashboard dashboard =  Dashboard.findBy { d -> id == idDashboard } as JSON;
		dashboard.delete();
		render 'Success' as JSON
	}
}
