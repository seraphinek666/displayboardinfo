package displayboardinfo

import displayboardinfo.types.ComponentType;

class Component {

	int id;
	ComponentType type;
	String location;
	String configuration;
	Dashboard dashboard;
	
    static constraints = {
		configuration nullable:true
    }
}
