<!doctype html>

<html>
<head>
<r:require modules="grailsEvents" />

<title>DisplayBoardInfo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<!-- Include the basic styles -->
<link type="text/css" rel="Stylesheet" href="/displayboardinfo/css/bjqs.css" />
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'bootstrap.css')}" type="text/css">
<link href="/displayboardinfo/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'analog.css')}" type="text/css">

<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'digital.css')}" type="text/css">


<link rel="stylesheet"
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">


<r:layoutResources/> 
</head>
<body>
	<div id="page-wrapper" style="margin: 50px auto; width:1000px; height:700px">
	</div>
	
	
	
	<script src="/displayboardinfo/js/lib/jquery-2.1.0.min.js"></script>
<script src="/displayboardinfo/js/lib/jquery.slides.js"></script>
<script src="/displayboardinfo/js/lib/bjqs-1.3.js"></script>
<script src="/displayboardinfo/js/lib/json2.js"></script>
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

			function replaceAll(find, replace, str) {
				  return str.replace(new RegExp(find, 'g'), replace);
				}
			
		
			
			function createInfoArea(configuration, elementToAppend) {
			$(elementToAppend).addClass('panel panel-success').append('<div class="panel-heading">' +
				'	<h3 class="panel-title">' + configuration.split(";")[0] + '</h3>' +
				'</div>' +
				'<div class="panel-body" id="information">' + configuration.split(";")[1] +
				'</div>');
			}

			function createCalendarWidget(configuration, elementToAppend) {
				var url = 'https://www.kichacze.pl/Serwis_pylkowy/mapa_pylen.aspx?ID=' + configuration; 
				$.ajax({
				    type: 'GET',
				    url: 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"'),
				    dataType: 'xml',
				    success: function(data) {
				    	$(elementToAppend).addClass('panel panel-success').append($('<div class="panel panel-info" style="width: 500px; float:left; margin:10px;">' +
				 	           ' <div class="panel-heading">' +
				 	              '<h3 class="panel-title">Pylenie roślin</h3>' +
				 	            '</div>' +
				 	            '<div id="alergy-content" class="panel-body">' + replaceAll('/_layout','/displayboardinfo/_layout',replaceAll('/_Layout','/_layout',data.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[14].childNodes[7].childNodes[8].childNodes[1].childNodes[3].innerHTML)) +
				 	          
				 	           ' </div>' +
				 	         ' </div>').html());
				         
				    },
				    async:   false,
				    error: function(data) {
						console.log(data);
					    }
				});
			}

			function createClockWidget(elementToAppend) {
				$(elementToAppend).addClass('panel panel-warning').append(
						'<div class="panel-heading">'+
						'<h3 class="panel-title">Zegar</h3>'+
					'</div>'+
					'<div class="panel-body">'+
						'<ul id="analog-clock" class="analog">'+
							'<li class="hour"></li>'+
							'<li class="min"></li>'+
							'<li class="sec"></li>'+
						'</ul>'+
						
					'</div>'


						);
				
					$('#analog-clock').clock({
						offset: '+2',
						type : 'analog'
					});

			}

function reloadPhysList(id, configuration) {
	$('#termList' + id + ' tr').not(function(){if ($(this).has('th').length){return true}}).remove();
	$.ajax({
		  type: "POST",
		  url: '/displayboardinfo/term/listPhysEvents/',
		  data: JSON.stringify({ physician_id: configuration}),
		  contentType: 'application/json; charset=utf-8',
		  success: function( data ) {
			  $.each( data, function( key, val ) {
				  	var date = new Date(val.start);
				  	if(date.getHours() < 10) {
					  	var hourString = '0' + date.getHours();
					  	} else {
						  	var hourString = date.getHours()
						  	}
				  	if(date.getMinutes() < 10) {
					  	var minuteString = '0' + date.getMinutes();
					  	} else {
						  	var minuteString = date.getMinutes()
						  	}
					

				  	
				  	var dateString = hourString + ":" + minuteString;
				   	$('#termList' + id + ' > tbody:last').append('<tr>' + '<td>' + dateString + '</td>'+'<td>' + 'czas_oczekiwania' + '</td>'+ '<td>' + val.patient.pesel + '</td>'+ '<td>' + val.room.number + ' / ' + val.room.floor + '</td>' + '<td>' + val.physician.title + ' ' + val.physician.name + ' ' + val.physician.surname+ ' ' + '</td>' + '</tr>');
				  });					  
				},
		  dataType: 'json'})

	
}	 
function configureWebSocket() {
var grailsEvents = new grails.Events("${createLink(uri: '')}");

grailsEvents.on('termAdded-' + configuration, function(data){
	 alert(data);
	 }); 

grailsEvents.on('termClosed-' + configuration, function(data){
		alert(data);
}); 
}
			
			function createPhysiciansTermList(configuration, elementToAppend, id) {
				$(elementToAppend).addClass('panel panel-info').append('<div class="panel-heading">' +
						'<h3 class="panel-title">Dzisiejsze wizyty</h3>' +
						'</div>' +
						'<div class="table-responsive">' +
							'<table id="termList' + id + '"' +
								' class="table table-striped table-bordered table-hover" width="500">' +
								'<thead>' +
									'<tr>' +
										'<th>Termin wizyty</th>' +
										'<th>Czas oczekiwania</th>' +
										'<th>Pacjent</th>' +
										'<th>Pokój / Piętro</th>' +
										'<th>Lekarz</th>' +
									'</tr>' +
								'</thead>' +
								'<tbody>' +
								'</tbody>' +
							'</table>' +
						'</div>');
				
				 setInterval(reloadPhysList(id, configuration), 5000);
				
			}
			
			function createAdvertisementArea(configuration, elementToAppend, id) {
				var arrayOfUrls = configuration.split(';');

$(elementToAppend).addClass('panel panel-danger').append(
'<div class="panel-heading"><h3 class="panel-title">Przestrzeń reklamowa</h3></div>' +
'<div id="advertisement' + id +'" class="panel-body"><ul class="bjqs"></ul></div>');


				$.each(arrayOfUrls, function(i, url) {
					$('#advertisement' + id + ' ul').append('<li><img u="' + i + '" src="' + url + '" /></li>');
					});

				 $('#advertisement' + id).bjqs({
				        'height' : 320,
				        'width' : 620,
				        showcontrols : false,
				        automatic : true,
				        'responsive' : true
				    });

			}
			
			function loadDashboard(idDashboard) {
				$('#page-wrapper').empty();
				var arr = { id: idDashboard };
				$.ajax({
					type : "POST",
					url : '/displayboardinfo/dashboard/findById/',
					data : JSON.stringify(arr),
					 contentType: 'application/json; charset=utf-8',
					success : function(data) {
						var templateToLoad = '';
						switch(data.dashboard.template) {
						case 'template1':
						    templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template1.html';
						    break;
						case 'template2':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template2.html';
						    break;
						case 'template3':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template3.html';
						    break;
						case 'template4':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template4.html';
						    break;
						case 'template5':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template5.html';
						    break;
						case 'template6':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template6.html';
						    break;
						case 'template7':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template7.html';
						    break;
						case 'template8':
							templateToLoad = '/displayboardinfo/view/clientDashboard/dashboard_template8.html';
						    break;
						default:
						    break;
						}

						$('#page-wrapper').load(templateToLoad, function() {

						$.each(data.components, function(i, component) {
							switch(component.type.name) {
							case 'AdvertisementArea':
								createAdvertisementArea(component.configuration, '#'+component.location, component.id);
							    break;
							case 'ClockWidget':
								createClockWidget('#'+component.location);
							    break;
							case 'CalendarWidget':
								createCalendarWidget(component.configuration, '#'+component.location);
							    break;
							case 'InfoArea':
								createInfoArea(component.configuration, '#'+component.location);
							    break;
							case 'PhysiciansTermList':
								createPhysiciansTermList(component.configuration, '#'+component.location, component.id);
							    break;
							default:
								 break;
							}});
						});
						
						
					},
					dataType : 'json'
				})
			}


		
		</script>



	



<r:layoutResources/> 
</body>
</html>
