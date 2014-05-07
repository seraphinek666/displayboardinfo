app.controller('AdminController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore) {
	
	 $scope.expandOrCollapse = function() {
	     	if($('#dictionaryMenu').hasClass('collapse')) {
		 		$('#dictionaryMenu').removeClass('collapse').addClass('expand');	    		
	    	} else {
	    		$('#dictionaryMenu').removeClass('expand').addClass('collapse');
	    	}
	    }    
	 
	 $scope.loadUsersView = function() {
		 $location.path('/user');
	 }
	 
	 $scope.loadPatientsView = function() {
		 $location.path('/patient');
	 }
	 
	 $scope.loadPhysiciansView = function() {
		 $location.path('/physician');
	 }
	 
	 $scope.loadRoomsView = function() {
		 $location.path('/room');
	 }
   
});