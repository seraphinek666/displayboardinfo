// W TYM PLIKU KONFIGURUJEMY PROPERTIESY I INICJALIZUJEMY MODUŁ

var app = angular.module('app', [ 'ngRoute', 'ui.bootstrap',
		'pascalprecht.translate', 'dialogs', 'ngCookies', 'ngTable', 'toaster', 'angular-md5', 'ui.calendar']);


//ROUTING KONTROLER -> WIDOK

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/displayboardinfo/view/dummy/dummy.html',
            controller: "DummyController"
		})
        .when('/login', {
//            templateUrl: 'displayboardinfo/login',
            redirectTo: function () {	
            	return "displayboardinfo/login";
            }
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
         .when('/tables', {
            templateUrl: '/displayboardinfo/view/tables/tables.html',
            controller: "TablesController"
        })
        .when('/daySchedule', {
            templateUrl: '/displayboardinfo/view/daySchedule/daySchedule.html',
            controller: "DayScheduleController"
        })
         .when('/dashboard', {
            templateUrl: '/displayboardinfo/view/dashboard/dashboard.html',
            controller: "DashboardController"
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
			authorize : '/displayboardinfo/login/authorize/'
		},
		user : {
			list : '/displayboardinfo/user/list/',
			save : '/displayboardinfo/user/save/',
			update : '/displayboardinfo/user/update/',
			remove : '/displayboardinfo/user/delete/'
		},
		patient : {
			list : '/displayboardinfo/patient/list/',
			save : '/displayboardinfo/patient/save/',
			update : '/displayboardinfo/patient/update/',
			remove : '/displayboardinfo/patient/delete/'
		},
		physician : {
			list : '/displayboardinfo/physician/list/',
			save : '/displayboardinfo/physician/save/',
			update : '/displayboardinfo/physician/update/',
			remove : '/displayboardinfo/physician/delete/'
		},
		room : {
			list : '/displayboardinfo/room/list/',
			save : '/displayboardinfo/room/save/',
			update : '/displayboardinfo/room/update/',
			remove : '/displayboardinfo/room/delete/'
		},
		term : {
			listPhysEvents : '/displayboardinfo/term/listPhysEvents/',
			listPhysEventsByDay : '/displayboardinfo/term/listPhysEventsByDay/',
			listRoomEvents : '/displayboardinfo/term/listRoomEvents/',
			save : '/displayboardinfo/term/save/',
			update : '/displayboardinfo/term/update/',
			remove : '/displayboardinfo/term/delete/'
		},
		dashboard : {
			save : '/displayboardinfo/dashboard/save/'
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

function ($routeProvider, $locationProvider, $httpProvider) {
    var interceptor = [
        '$rootScope', '$q', function (scope, $q) {

            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;

                if (status == 401) {
                    var deferred = $q.defer();
                    var req = {
                        config: response.config,
                        deferred: deferred
                    };
                    window.location = "/";
                }

                if (status == 404) {
                    var deferred = $q.defer();
                    var req = {
                        config: response.config,
                        deferred: deferred
                    };
                    window.location = "#/404";
                }
                // otherwise
                //return $q.reject(response);
                window.location = "#/500";
            }

            return function (promise) {
                return promise.then(success, error);
            };

        }
    ];
    $httpProvider.responseInterceptors.push(interceptor);
});

// routes
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/404', {
            templateUrl: '/app/html/inserts/error404.html',
            controller: 'RouteCtrl'
        })
        .when('/500', {
            templateUrl: '/app/html/inserts/error404.html',
            controller: 'RouteCtrl'
        })

   };