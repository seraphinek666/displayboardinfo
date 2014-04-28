// W TYM PLIKU KONFIGURUJEMY PROPERTIESY I INICJALIZUJEMY MODUŁ

var app = angular.module('app', [ 'ui.bootstrap', 'pascalprecht.translate', 'dialogs',
		'ngCookies', 'ui.router' ]);

// ROUTING KONTROLER -> WIDOK

app.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("");
	//
	// Now set up the states
	$stateProvider.state('root', {
		url : "",
		templateUrl : "view/main/main.html"
	}).state('admin', {
		url : "/admin",
		templateUrl : "view/admin/admin.html"
	}).state('admin.dashboardy', {
		url : "/dashboardy",
		templateUrl : "view/admin/dashboardy.html"
	})	.state('admin.uzytkownicy', {
		url : "/uzytkownicy",
		templateUrl : "view/admin/uzytkownicy.html"
	}).state('admin.pacjenci', {
		url : "/pacjenci",
		templateUrl : "view/admin/pacjenci.html"
	}).state('admin.lekarze', {
		url : "/lekarze",
		templateUrl : "view/admin/lekarze.html"
	}).state('admin.harmonogramy', {
		url : "/harmonogramy",
		templateUrl : "view/admin/harmonogramy.html"
	}).state('admin.gabinety', {
		url : "/gabinety",
		templateUrl : "view/admin/gabinety.html"
	}).state('client', {
		url : "/client",
		templateUrl : "view/client/client.html"

	})
});

// TŁUMACZENIA (przykładowe)

app.config(function($translateProvider) {
	$translateProvider.translations('pl', {
		MENU : {
			LOGO : 'DisplayBoardInfo',
			ADMIN : 'Widok administratora'
		},
		SUCCESS : 'Sukces',
		FAILURE : 'BĹ‚Ä…d',
		ACTION : 'Akcja',
		NOT_COMPLETED : 'Nie skoĹ„czone',
		COMPLETED : 'SkoĹ„czone',
		SENT : 'WysĹ‚ane',
		NOT_STARTED : 'Nie rozpoczÄ™te'
	});

	$translateProvider.translations('en', {
		MENU : {
			LOGO : 'DisplayBoardInfo',
			ADMIN : 'Administrator View'
		},
		SUCCESS : 'Success',
		FAILURE : 'Error',
		ACTION : 'Actions',
		NOT_COMPLETED : 'Not completed',
		COMPLETED : 'Completed',
		SENT : 'Sent',
		NOT_STARTED : 'Not Started'
	});

	$translateProvider.preferredLanguage('en');
});

var DisplayBoardInfo = {};

DisplayBoardInfo.config = {
	url : {
		login : {
			get : '/authorize/login',
			set : '/authorize/logout'
		}
	},
	column : {
		user : [ {
			name : 'login',
			label : 'USER.LOGIN',
			visible : true,
			style : ''
		}, {
			name : 'userType',
			label : "USER.TYPE",
			visible : true,
			style : ''
		} ]
	}
};

DisplayBoardInfo.lastView = "";

//app.config([ '$routeProvider', function($routeProvider) {
//$routeProvider
//.when('/', {
//templateUrl: 'view/main/main.html',
//controller: "MainController"
//})
//        .when('/login', {
//            templateUrl: 'view/login/login.html',
//            controller: "LoginController"
//        })
//        .when('/admin', {
//            templateUrl: 'view/admin/admin.html',
//            controller: "AdminController"
//        })
//        .when('/client', {
//            templateUrl: 'view/client/client.html',
//            controller: "ClientController"
//        })
//.otherwise({ redirectTo : "/"});
//}]);
