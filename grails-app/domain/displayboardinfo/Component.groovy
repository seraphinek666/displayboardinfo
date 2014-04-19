package displayboardinfo

import displayboardinfo.types.ComponentType;

class Component {

	int id;
	Dashboard dashboard;
	ComponentType componentType;
	Map<String,String> configuration;
	
    static constraints = {
    }
}
