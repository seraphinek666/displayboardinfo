package displayboardinfo

import java.sql.Timestamp;

class Term {

	int id_term;
	Timestamp start;
	Timestamp end;
	String title;
	Physician physician;
	Room room;
	Patient patient;
	Boolean allDay;
	Boolean completed;
	
	
    static constraints = {
    }
	
	static mapping = {
		id name: 'id_term'
	}
}
