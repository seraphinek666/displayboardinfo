app.controller('LoginController', function ($scope, $routeParams, $location, $translate, BaseService, $dialogs, $cookieStore) {
	  var configUrl = DisplayBoardInfo.config.url;

    $scope.init = function() {
        BaseService.post(configUrl.login.get, -1).then(function(user) {
            $scope.item = user;
        });
    }

    $scope.login = function() {
        // Encode the String
        var encodedString = Base64.encode($scope.item.password);
        console.log(encodedString);

        var user = {};
        angular.copy($scope.item, user);
        user.password = encodedString;

        BaseService.post(configUrl.login.set, user).then(function(response) {
            if(response.id > 0) {
                $translate('SUCCESS').then(function(translated){
                    $dialogs.notify(translated);
                    //FIXME!! Just few options not all!
                    $cookieStore.put('userData', response);
                    //$location.path("/" + response.userType);
                    $location.path("/scribe");
                });

            } else if(response === ""){
                $translate('FAILURE').then(function(translated){
                    $dialogs.error(translated);
                });
            } else {
                alert("Cos poszlo nie tak: odpowiedz to: " + response);
            }
        });
    }
});