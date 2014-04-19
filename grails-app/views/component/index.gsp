
<%@ page import="displayboardinfo.Component" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'component.label', default: 'Component')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-component" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-component" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="componentType" title="${message(code: 'component.componentType.label', default: 'Component Type')}" />
					
						<g:sortableColumn property="configuration" title="${message(code: 'component.configuration.label', default: 'Configuration')}" />
					
						<th><g:message code="component.dashboard.label" default="Dashboard" /></th>
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${componentInstanceList}" status="i" var="componentInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${componentInstance.id}">${fieldValue(bean: componentInstance, field: "componentType")}</g:link></td>
					
						<td>${fieldValue(bean: componentInstance, field: "configuration")}</td>
					
						<td>${fieldValue(bean: componentInstance, field: "dashboard")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${componentInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
