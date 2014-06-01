package displayboardinfo

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.JSON

@Transactional(readOnly = true)
class DashboardController {

	def list() {
		def all = Dashboard.all;
		//		for(Dashboard d : all) {
		//			d
		//		}
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
			componentToSave.location = component.location;
			componentToSave.dashboard = dashboard;
			componentToSave.save();
		}
		
		render 'Success'
	}

	def findById() {
		def json = request.JSON.dashboard;
		def dashboardFromDB = Dashboard.find { d -> id == json.id };
		def components = Component.findAll { c -> dashboard == dashboardFromDB };
		def responseData = ['dashboard' : dashboardFromDB, 'components' : components];
		render responseData as JSON;
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
		int idDashboard = request.JSON.dashboard.id;
		Dashboard dashboardFromDb =  Dashboard.find { d -> id == idDashboard };
		def components = Component.findAll { c -> dashboard == dashboardFromDb };
		for(Component c : components) {
			c.delete();
		}
		dashboardFromDb.delete();
		render 'Success'
	}
}
