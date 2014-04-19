<%@ page import="displayboardinfo.Component" %>



<div class="fieldcontain ${hasErrors(bean: componentInstance, field: 'componentType', 'error')} required">
	<label for="componentType">
		<g:message code="component.componentType.label" default="Component Type" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="componentType" from="${displayboardinfo.types.ComponentType?.values()}" keys="${displayboardinfo.types.ComponentType.values()*.name()}" required="" value="${componentInstance?.componentType?.name()}" />

</div>

<div class="fieldcontain ${hasErrors(bean: componentInstance, field: 'configuration', 'error')} ">
	<label for="configuration">
		<g:message code="component.configuration.label" default="Configuration" />
		
	</label>
	

</div>

<div class="fieldcontain ${hasErrors(bean: componentInstance, field: 'dashboard', 'error')} required">
	<label for="dashboard">
		<g:message code="component.dashboard.label" default="Dashboard" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="dashboard" name="dashboard.id" from="${displayboardinfo.Dashboard.list()}" optionKey="id" required="" value="${componentInstance?.dashboard?.id}" class="many-to-one"/>

</div>

