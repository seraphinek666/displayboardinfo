// W TYM PLIKU KONFIGURUJEMY PROPERTIESY I INICJALIZUJEMY MODUŁ

var app = angular.module('app', [ 'ngRoute', 'ui.bootstrap',
		'pascalprecht.translate', 'dialogs', 'ngCookies', 'ngTable', 'toaster' ]);


//ROUTING KONTROLER -> WIDOK

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/displayboardinfo/view/dummy/dummy.html',
            controller: "DummyController"
		})
        .when('/login', {
            templateUrl: '/displayboardinfo/view/login/login.html',
            controller: "LoginController"
        })
         .when('/user', {
            templateUrl: '/displayboardinfo/view/user/user.html',
            controller: "UserController"
        })
        .when('/patient', {
            templateUrl: '/displayboardinfo/view/patient/patient.html',
            controller: "PatientController"
        })
        .when('/physician', {
            templateUrl: '/displayboardinfo/view/physician/physician.html',
            controller: "PhysicianController"
        })
         .when('/room', {
            templateUrl: '/displayboardinfo/view/room/room.html',
            controller: "RoomController"
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
		user : {
			list : '/displayboardinfo/user/list/'
		},
		patient : {
			list : '/displayboardinfo/patient/list/',
			save : '/displayboardinfo/patient/save/'
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

