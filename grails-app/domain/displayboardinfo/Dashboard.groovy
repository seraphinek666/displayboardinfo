package displayboardinfo

import displayboardinfo.types.DashboardType


class Dashboard {

	int id;
	DashboardType type;
	Map<String,Component> components;
	
    static constraints = {
    }
}
