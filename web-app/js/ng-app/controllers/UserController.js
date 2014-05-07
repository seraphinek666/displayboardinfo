app.controller('UserController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore) {

	 BaseService.post(DisplayBoardInfo.config.url.user.list).then(function(response) {
         $scope.users = response;
     });
    
});