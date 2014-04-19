package displayboardinfo

import java.sql.Timestamp;

class Term {

	int id;
	Timestamp time;
	Physician physician;
	Room room;
	Patient patient;
	
	
    static constraints = {
    }
}
