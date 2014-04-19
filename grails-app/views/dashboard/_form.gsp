<%@ page import="displayboardinfo.Dashboard" %>



<div class="fieldcontain ${hasErrors(bean: dashboardInstance, field: 'components', 'error')} ">
	<label for="components">
		<g:message code="dashboard.components.label" default="Components" />
		
	</label>
	

</div>

<div class="fieldcontain ${hasErrors(bean: dashboardInstance, field: 'type', 'error')} required">
	<label for="type">
		<g:message code="dashboard.type.label" default="Type" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="type" from="${displayboardinfo.types.DashboardType?.values()}" keys="${displayboardinfo.types.DashboardType.values()*.name()}" required="" value="${dashboardInstance?.type?.name()}" />

</div>

