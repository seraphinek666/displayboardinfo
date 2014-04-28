<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><g:layoutTitle default="iDashboard" /></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'bootstrap.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'sb-admin.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">

<style type="text/css" media="screen">
#side-menu a {
	font-size: 18px;
}

#page-wrapper{
	color: #333;
}

@font-face {
	font-family: 'Philosopher';
	src: url('WebRoot/fonts/philosopher-regular.eot');
	src: url('WebRoot/fonts/philosopher-regular.eot?#iefix')
		format('embedded-opentype'),
		url('WebRoot/fonts/philosopher-regular.woff') format('woff'),
		url('WebRoot/fonts/philosopher-regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

@media screen and (max-width: 480px) {

	#page-body {
		margin: 0 1em 1em;
	}
	#page-body h1 {
		margin-top: 0;
	}
}
</style>

<g:layoutHead />
<g:javascript library="application" />
<g:javascript library="jquery"/>
<r:layoutResources />
</head>
<body>
	<div id="wrapper">
		<!-- Bars -->
		<!-- TOP bar -->
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="navbar-header">
				<a class="navbar-brand" href="#"> <span
					class="glyphicon glyphicon-th-large"></span> iDashboard
				</a>
			</div>
			
			<ul class="nav navbar-top-links navbar-right">
				<li class="dropdown">
					<a class="dropdown-toggle" href="#" data-toggle="dropdown">
						User Name
						<i class="fa fa-user fa-fw"></i>
						<i class="fa fa-caret-down"></i>
					</a>
					<ul class="dropdown-menu dropdown-user">
					<li>
						<a href="#"><i class="fa fa-gear fa-fw"></i>Settings</a>
					</li>
					<li>
						<a href="#"><i class="fa fa-sign-out fa-fw"></i>Logout</a>
					</li>
					</ul>
				</li>
			</ul>

			<!-- LEFT bar -->
			<div class="navbar-default navbar-static-side" role="navigation">
				<div class="sidebar-collapse">
					<ul id="side-menu" class="nav">
						<li><a href="#"><i class="fa fa-home"></i> Home</a></li>
						<li><a href="#"><i class="fa fa-key"></i> Room</a></li>
						<li><a href="#"><i class="fa fa-users"></i> Patient</a></li>
						<li><a href="#"><i class="fa fa-tachometer"></i>
								Dashboard</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<!-- page content -->
		<div id="page-wrapper"></div>
	</div>

	<!--  <div id="grailsLogo" role="banner"><a href="http://grails.org"><img src="${resource(dir: 'images', file: 'grails_logo.png')}" alt="Grails"/></a></div>
		<g:layoutBody/>
		<div class="footer" role="contentinfo"></div>
		<div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/></div>
		<r:layoutResources />
		-->
</body>
</html>
