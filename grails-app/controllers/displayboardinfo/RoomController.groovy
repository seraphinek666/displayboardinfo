package displayboardinfo;


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import java.awt.Toolkit;
import grails.converters.JSON

@Transactional(readOnly = true)
class RoomController {

    def list() {
		render Room.all as JSON;
	}

	@Transactional
	def save() {		
		Room roomInstance = request.JSON.room;		
		try {
			roomInstance.save();
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
			Room toUpdate = Room.find{room -> id == json.room.id};
			toUpdate.number = json.room.number;
			toUpdate.floor = json.room.floor;
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
			Room toDelete = Room.find{room -> id == json.room.id};
			toDelete.delete();
			render 'Success'
		} catch (Exception e) {
			response.status = 500
			render e
		}
	}
}
