
<%@ page import="displayboardinfo.Term" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'term.label', default: 'Term')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-term" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-term" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list term">
			
				<g:if test="${termInstance?.patient}">
				<li class="fieldcontain">
					<span id="patient-label" class="property-label"><g:message code="term.patient.label" default="Patient" /></span>
					
						<span class="property-value" aria-labelledby="patient-label"><g:link controller="patient" action="show" id="${termInstance?.patient?.id}">${termInstance?.patient?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${termInstance?.physician}">
				<li class="fieldcontain">
					<span id="physician-label" class="property-label"><g:message code="term.physician.label" default="Physician" /></span>
					
						<span class="property-value" aria-labelledby="physician-label"><g:link controller="physician" action="show" id="${termInstance?.physician?.id}">${termInstance?.physician?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${termInstance?.room}">
				<li class="fieldcontain">
					<span id="room-label" class="property-label"><g:message code="term.room.label" default="Room" /></span>
					
						<span class="property-value" aria-labelledby="room-label"><g:link controller="room" action="show" id="${termInstance?.room?.id}">${termInstance?.room?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${termInstance?.time}">
				<li class="fieldcontain">
					<span id="time-label" class="property-label"><g:message code="term.time.label" default="Time" /></span>
					
						<span class="property-value" aria-labelledby="time-label"><g:fieldValue bean="${termInstance}" field="time"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:termInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${termInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
