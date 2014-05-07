<!doctype html>

<!-- Adding 'ng-app' tells Angular to start its magic at this point in the DOM -->
<html ng-app="app">
<head>
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
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">

</head>

<body ng-controller="ClientController">

<span>Programowanie w Angular.js</span>
<img src="/displayboardinfo/images/1399481932633.gif"></img>
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
	<script
		src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.10.0.js"></script>

	<script src="/displayboardinfo/js/ng-app/directive/Dialog.js"></script>

	<script src="/displayboardinfo/js/ng-app/application.js"></script>
	<script src="/displayboardinfo/js/ng-app/service/BaseService.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/AdminController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/ClientController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/MainController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/LoginController.js"></script>
	<script src="/displayboardinfo/js/ng-app/controllers/UserController.js"></script>
</body>
</html>
