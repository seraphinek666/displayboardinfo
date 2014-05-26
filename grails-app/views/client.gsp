<!doctype html>

<!-- Adding 'ng-app' tells Angular to start its magic at this point in the DOM -->
<html>
<head>
<r:require modules="grailsEvents" />
<title>DisplayBoardInfo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="/displayboardinfo/js/lib/jquery-2.1.0.min.js"></script>
<script src="/displayboardinfo/js/lib/jssor.slider.min.js"></script>
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'bootstrap.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'sb-admin.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'ng-table.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'toaster.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'adminPanel.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'dhtmlxscheduler.css')}"
	type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'analog.css')}" type="text/css">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'digital.css')}" type="text/css">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'fullcalendar.css')}"
	type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'fullcalendar.print.css')}"
	type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'angular-ui-dashboard.css')}"
	type="text/css">

<style type="text/css">
#page-wrapper {
	position: inherit;
	margin: 0px 0px 0px 250px;
	padding: 0px 30px;
	border-left: 1px solid #E7E7E7;
	height: auto;
	min-height: 550px;
	overflow: auto;
}

.included_content {
	border-style: solid;
	border-width: medium;
	height: 200px;
	width: 100%;
	margin: auto;
}

.example_panel {
	border-style: dotted;
	border-width: medium;
	height: 100%;
}
</style>
</head>

<body>
	<div id="page-wrapper">
		<div id="alergy">
			<script>
				$(function() {
					$('#alergy').load(
							'/displayboardinfo/view/component/alergy.html')
				});
			</script>
		</div>
		<div id="clock">
			<script>
				$(function() {
					$('#clock').load(
							'/displayboardinfo/view/component/clock.html')
				});
			</script>

		</div>
		<div id="infobox">
			<script>
				$(function() {
					$('#infobox').load(
							'/displayboardinfo/view/component/infobox.html')
				});
			</script>

		</div>
		<div id="advertisement">
			<script>
				$(function() {
					$('#advertisement').load(
							'/displayboardinfo/view/component/advertisement.html')
				});
			</script>

		</div>
		<div id="termList">
			<script>
				$(function() {
					$('#termList').load(
							'/displayboardinfo/view/component/termList.html')
				});
			</script>

		</div>
	</div>
	<!-- /#page-wrapper -->



	<script src="/displayboardinfo/js/lib/raphael-2.1.0.min.js"></script>
	<script src="/displayboardinfo/js/lib/morris.js"></script>
	<script src="/displayboardinfo/js/lib/jquery.metisMenu.js"></script>
	<script src="/displayboardinfo/js/lib/sb-admin.js"></script>
	<script src="/displayboardinfo/js/lib/jquery.clock.js"></script>
	<script src="/displayboardinfo/js/lib/angular.min.js"></script>
	<script src="/displayboardinfo/js/lib/angular-route.min.js"></script>
	<script src="/displayboardinfo/js/lib/angular-translate.min.js"></script>
	<script src="/displayboardinfo/js/lib/angular-cookies.js"></script>
	<script src="/displayboardinfo/js/lib/angular-sanitize.js"></script>
	<script src="/displayboardinfo/js/lib/bootstrap.min.js"></script>
	<script src="/displayboardinfo/js/lib/ng-table.js"></script>
	<script src="/displayboardinfo/js/lib/toaster.js"></script>
	<script src="/displayboardinfo/js/lib/angular-md5.js"></script>
	<script src="/displayboardinfo/js/lib/dhtmlxscheduler.js"></script>
	<script src="/displayboardinfo/js/lib/dhtmlxscheduler_minical.js"></script>
	<script src="/displayboardinfo/js/lib/calendar.js"></script>
	<script src="/displayboardinfo/js/lib/jquery-ui.custom.min.js"></script>
	<script src="/displayboardinfo/js/lib/fullcalendar.min.js"></script>
	<script src="/displayboardinfo/js/lib/dialogs.min.js"></script>
	<script
		src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.10.0.js"></script>

	<script
		src="//rawgithub.com/angular-ui/ui-sortable/master/src/sortable.js"></script>




</body>
</html>
