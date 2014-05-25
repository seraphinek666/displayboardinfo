<!doctype html>

<!-- Adding 'ng-app' tells Angular to start its magic at this point in the DOM -->
<html ng-app="app">
<head>
<r:require modules="grailsEvents" />
<title>DisplayBoardInfo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">


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

<body ng-controller="ClientController">





	<div id="page-wrapper" ng-view></div>
	<!-- /#page-wrapper -->


	<script src="/displayboardinfo/js/lib/jquery-2.1.0.min.js"></script>
	<script src="/displayboardinfo/js/lib/raphael-2.1.0.min.js"></script>
	<script src="/displayboardinfo/js/lib/morris.js"></script>
	<script src="/displayboardinfo/js/lib/jquery.metisMenu.js"></script>
	<script src="/displayboardinfo/js/lib/sb-admin.js"></script>

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

	<script src="/displayboardinfo/js/ng-app/directive/Dialog.js"></script>

	<script src="/displayboardinfo/js/ng-app/application.js"></script>
	<script src="/displayboardinfo/js/ng-app/service/BaseService.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/AdminController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/ClientController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/LoginController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/UserController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/PatientController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/PhysicianController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/RoomController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/DummyController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/DashboardController.js"></script>
	<script
		src="/displayboardinfo/js/ng-app/controllers/TablesController.js"></script>
	<script>

	function replaceAll(find, replace, str) {
		  return str.replace(new RegExp(find, 'g'), replace);
		}

	
		$(function() {
			
			var url = 'https://www.kichacze.pl/Serwis_pylkowy/mapa_pylen.aspx?ID=6'; // website you want to scrape
			$.ajax({
			    type: 'GET',
			    url: 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"'),
			    dataType: 'xml',
			    success: function(data) {
			        
			        $('#page-wrapper').html(replaceAll('/_layout','/displayboardinfo/_layout',replaceAll('/_Layout','/_layout',data.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[14].childNodes[7].childNodes[8].childNodes[1].childNodes[3].childNodes[7].innerHTML)));
			    },
			    error: function(data) {
					console.log(data);
				    }
			});
		});
	</script>

</body>
</html>
