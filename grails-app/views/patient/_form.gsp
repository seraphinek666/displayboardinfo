<%@ page import="displayboardinfo.Patient" %>



<div class="fieldcontain ${hasErrors(bean: patientInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="patient.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${patientInstance?.name}"/>

</div>

