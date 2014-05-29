package displayboardinfo

import displayboardinfo.types.ComponentType;

class Component {

	int id;
	ComponentType type;
	String configuration;
	
    static constraints = {
		configuration nullable:true
    }
}
