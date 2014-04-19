
<%@ page import="displayboardinfo.Term" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'term.label', default: 'Term')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-term" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-term" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<th><g:message code="term.patient.label" default="Patient" /></th>
					
						<th><g:message code="term.physician.label" default="Physician" /></th>
					
						<th><g:message code="term.room.label" default="Room" /></th>
					
						<g:sortableColumn property="time" title="${message(code: 'term.time.label', default: 'Time')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${termInstanceList}" status="i" var="termInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${termInstance.id}">${fieldValue(bean: termInstance, field: "patient")}</g:link></td>
					
						<td>${fieldValue(bean: termInstance, field: "physician")}</td>
					
						<td>${fieldValue(bean: termInstance, field: "room")}</td>
					
						<td>${fieldValue(bean: termInstance, field: "time")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${termInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
