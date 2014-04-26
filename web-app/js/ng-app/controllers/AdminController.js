app.controller('AdminController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore) {
	
    var configUrl = DisplayBoardInfo.config.url;
    
  
    $scope.client = function() {
    	$location.path("/client");
    }
    

    $scope.admin = function() {
    	$location.path("/admin");
    }
    
});