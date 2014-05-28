package displayboardinfo

import displayboardinfo.types.DashboardType


class Dashboard {

	int id;
	String template;
	String name;
	Map<String,Component> components;
	
    static constraints = {
    }
}
