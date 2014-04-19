<%@ page import="displayboardinfo.Term" %>



<div class="fieldcontain ${hasErrors(bean: termInstance, field: 'patient', 'error')} required">
	<label for="patient">
		<g:message code="term.patient.label" default="Patient" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="patient" name="patient.id" from="${displayboardinfo.Patient.list()}" optionKey="id" required="" value="${termInstance?.patient?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: termInstance, field: 'physician', 'error')} required">
	<label for="physician">
		<g:message code="term.physician.label" default="Physician" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="physician" name="physician.id" from="${displayboardinfo.Physician.list()}" optionKey="id" required="" value="${termInstance?.physician?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: termInstance, field: 'room', 'error')} required">
	<label for="room">
		<g:message code="term.room.label" default="Room" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="room" name="room.id" from="${displayboardinfo.Room.list()}" optionKey="id" required="" value="${termInstance?.room?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: termInstance, field: 'time', 'error')} required">
	<label for="time">
		<g:message code="term.time.label" default="Time" />
		<span class="required-indicator">*</span>
	</label>
	

</div>

