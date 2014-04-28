app.service('BaseService', function($http, $q) {
	var baseService = {};

	baseService.post = function(url, requestBody) {
		var d = $q.defer();
		
		$http.post(url, requestBody).success(function(response) {
			d.resolve(response);
		}).error(function(response) {
                //TODO
                alert("Error while posting " + url);
        });
		
		return d.promise;
	};

    baseService.get = function(url) {
        var d = $q.defer();

        $http.get(url).success(function(response) {
            d.resolve(response);
        }).error(function(response) {
            //TODO
            alert("Error while getting " + url);
        });

        return d.promise;
    };
	
	return baseService;
});