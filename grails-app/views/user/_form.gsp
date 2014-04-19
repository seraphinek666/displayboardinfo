<%@ page import="displayboardinfo.User" %>



<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'userType', 'error')} required">
	<label for="userType">
		<g:message code="user.userType.label" default="User Type" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="userType" from="${displayboardinfo.types.UserType?.values()}" keys="${displayboardinfo.types.UserType.values()*.name()}" required="" value="${userInstance?.userType?.name()}" />

</div>

