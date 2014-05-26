<html ng-app="app">
<head>
<title>DisplayBoardInfo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'bootstrap.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">

<style type="text/css">
.form-signin {
	max-width: 330px;
	padding: 15px;
	margin: 0px auto;
}

.form-signin-heading {
	text-align: center;
}
</style>

</head>
<body ng-controller="LoginController">
	<div class="container">
		<form class="form-signin">
			<h2 class="form-signin-heading">Zaloguj się</h2>
			<input class="form-control" name="username" ng-model="username"
				required="" placeholder="Login"></input> <input type="password"
				name="password" class="form-control" ng-model="password" required=""
				placeholder="Hasło"></input> <label class="checkbox"> <input
				type="checkbox" value="remember-me"></input> Zapamiętaj
			</label>
			<button class="btn btn-lg btn-primary btn-block" ng-click="login()"
				type="submit">Zaloguj</button>
		</form>
	</div>


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
	
	<script src="/displayboardinfo/js/lib/jquery-ui.custom.min.js"></script>
	<script src="/displayboardinfo/js/lib/calendar.js"></script>
	<script src="/displayboardinfo/js/lib/fullcalendar.min.js"></script>
	<script src="/displayboardinfo/js/lib/dialogs.min.js"></script>
	<script
		src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.10.0.js"></script>
	
	<script src="//rawgithub.com/angular-ui/ui-sortable/master/src/sortable.js"></script>

	<script src="/displayboardinfo/js/ng-app/directive/Dialog.js"></script>

	<script src="/displayboardinfo/js/ng-app/application.js"></script>
	<script src="/displayboardinfo/js/ng-app/service/BaseService.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/AdminController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/ClientController.js"></script>	
	<script src="/displayboardinfo/js/ng-app/controllers/LoginController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/UserController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/PatientController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/PhysicianController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/RoomController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/DummyController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/DashboardController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/TablesController.js"></script>

</body>
</html>