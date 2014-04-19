<%@ page import="displayboardinfo.Room" %>



<div class="fieldcontain ${hasErrors(bean: roomInstance, field: 'name', 'error')} ">
	<label for="name">
		<g:message code="room.name.label" default="Name" />
		
	</label>
	<g:textField name="name" value="${roomInstance?.name}"/>

</div>

