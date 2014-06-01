<!doctype html>

<!-- Adding 'ng-app' tells Angular to start its magic at this point in the DOM -->
<html>
<head>
 <r:require modules="grailsEvents"/>

<title>DisplayBoardInfo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="/displayboardinfo/js/lib/jquery-2.1.0.min.js"></script>
<script src="/displayboardinfo/js/lib/jssor.slider.min.js"></script>
<script src="/displayboardinfo/js/lib/json2.js"></script>
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'bootstrap.css')}" type="text/css">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'ng-table.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'toaster.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'adminPanel.css')}" type="text/css">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'analog.css')}" type="text/css">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'digital.css')}" type="text/css">


<link rel="stylesheet"
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">

<style type="text/css">
html,body
{
    height: 100%;
}
body
{
  	display: table; 
  	margin: 0 auto;
	background: rgba(255,255,255,1);
	background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: -webkit-gradient(radial, center center, 0px, center center, 100%, , color-stop(0%, rgba(255,255,255,1)), color-stop(70%, rgba(230,230,230,1)), color-stop(100%, rgba(214,214,214,1)));
	background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d6d6d6', GradientType=1 );

}
.redirectPanel
{  
    height: 100%;
    display: table-cell;   
    vertical-align: middle;
    width:200px;
    height:200px;   
}

</style>

</head>

<body>



	<div id="page-wrapper" style="text-align: center;">

		<script>
			$(function() {
				$('#page-wrapper').append('<span style="margin: 0 auto">Wybierz jeden z dostępnych dashboardów</span>');
				$.ajax({
					type : "POST",
					url : '/displayboardinfo/dashboard/list/',
					success : function(data) {
						$.each(data, function(key, val) {
							$('#page-wrapper').append(
									'<br/><button class="btn btn-default" style="margin: 0 auto" onClick="loadDashboard(' + val.id
											+ ')">' + val.name + '</button>');
						});
					},
					dataType : 'json'
				})
			});

			function loadDashboard(idDashboard) {
				$('#page-wrapper').empty();
				var arr = { id: idDashboard };
				$.ajax({
					type : "POST",
					url : '/displayboardinfo/dashboard/findById/',
					data : JSON.stringify(arr),
					 contentType: 'application/json; charset=utf-8',
					success : function(data) {
						alert(data);
					},
					dataType : 'json'
				})
			}
		</script>



<!-- 
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
					$('#advertisement')
							.load(
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
			-->
	</div>

	<!-- /#page-wrapper -->




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
