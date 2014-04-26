// W TYM PLIKU KONFIGURUJEMY PROPERTIESY I INICJALIZUJEMY MODUŁ

var app = angular.module('app', [ 'ngRoute', 'ui.bootstrap',
		'pascalprecht.translate', 'dialogs', 'ngCookies' ]);


//ROUTING KONTROLER -> WIDOK

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'view/main/main.html',
			controller: "MainController"
		})
        .when('/login', {
            templateUrl: 'view/login/login.html',
            controller: "LoginController"
        })
        .when('/admin', {
            templateUrl: 'view/admin/admin.html',
            controller: "AdminController"
        })
        .when('/client', {
            templateUrl: 'view/client/client.html',
            controller: "ClientController"
        })
		.otherwise({ redirectTo : "/"});
}]);

// TŁUMACZENIA (przykładowe)

app.config(function ($translateProvider) {
	$translateProvider.translations('pl', {
		MENU: {
            LOGO: 'DisplayBoardInfo',
			ADMIN: 'Widok administratora'
		},
        SUCCESS: 'Sukces',
        FAILURE: 'BĹ‚Ä…d',
        ACTION: 'Akcja',
        NOT_COMPLETED: 'Nie skoĹ„czone',
        COMPLETED: 'SkoĹ„czone',
        SENT: 'WysĹ‚ane',
        NOT_STARTED: 'Nie rozpoczÄ™te'
	});


    $translateProvider.translations('en', {
        MENU: {
            LOGO: 'DisplayBoardInfo',
            ADMIN: 'Administrator View'
        },
        SUCCESS: 'Success',
        FAILURE: 'Error',
        ACTION: 'Actions',
        NOT_COMPLETED: 'Not completed',
        COMPLETED: 'Completed',
        SENT: 'Sent',
        NOT_STARTED: 'Not Started'
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

