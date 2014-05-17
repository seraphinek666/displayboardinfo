app.controller('LoginController', function($scope, $routeParams, $location,
		$translate, BaseService, $dialogs, $cookieStore) {

	$scope.login = function() {
		var credentials = {
			username : this.username,
			password : this.password
		};

		BaseService.post(DisplayBoardInfo.config.url.login.authorize, {
			loginCredentials : credentials
		}).then(function(response) {
			if (response === 'Failure') {
				// TODO ogarnąć błąd logowania
			} else {
				$cookieStore.userName = response.userName;
				window.location = "/displayboardinfo/admin";
			}
		});

	};

});
