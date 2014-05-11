app.controller('LoginController', function($scope, $routeParams, $location,
		$translate, BaseService, $dialogs, $cookieStore) {


	  $scope.login = function () {
	      var credentials = {
	          username: this.username,
	          password: this.password
	      };
	  };
	  

	});
