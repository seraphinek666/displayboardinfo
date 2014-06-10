package displayboardinfo

import java.sql.Timestamp;

class Term {

	int id_term;
	Date start;
	Date end;
	String title;
	Physician physician;
	Room room;
	Patient patient;
	Boolean allDay;
	Boolean completed;



	static constraints = {
		physician nullable:true
		room nullable:true
		patient nullable:true
	}

	static mapping = { id name: 'id_term' }
}
