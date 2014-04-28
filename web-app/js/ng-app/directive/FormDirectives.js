app.directive('myInput', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		type: '@',
     		label: '@',
     		tip: '@',
    		value: '=',
    		minlength: '@',
    		maxlength: '@',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		inputClass:'@'
     	},
     	controller: function($scope) {
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
     		+ '<div class="{{ inputClass }}">'
		    + '<input name="mI" type="{{ type }}" class="form-control input-sm" ng-model="value" ng-minlength="{{ minlength }}" ng-maxlength="{{ maxlength }}" ng-required="{{ required }}" ng-disabled="isDisabled()">'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mI.$valid }">{{ tip | translate }}</span>'
		    + '</div>'
		    + '</div></ng-form>'
  };
});

app.directive('myCheckbox', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		label: '@',
    		value: '=',
    		disabled: '@',
    		onChange: '&'
     	},
     	controller: function($scope) {
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="checkbox"><label>'
		    + '<input type="checkbox" ng-model="value" ng-change="onChange()" ng-disabled="isDisabled()">'
		    + '<span>{{ label | translate }}</span>'
		    + '</label></div></ng-form>'
  };
});

app.directive('mySelect', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		label: '@',
     		tip: '@',
    		value: '=',
    		options:'=',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		selectClass:'@'
     	},
     	controller: function($scope) {
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF" role="form"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
		    + '<div class="{{ selectClass }}">'
		    + '<select name="mS" class="form-control input-sm" ng-model="value" ng-required="{{ required }}" ng-disabled="isDisabled()">'
		    + '<option ng-repeat="item in options" value="{{ item.id }}">{{ item.name | translate }}</option></select><div>'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mS.$valid }">{{ tip | translate }}</span>'
			+ '</div></ng-form>'
	};
});

app.directive('myTextarea', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		rows: '@',
     		label: '@',
     		tip: '@',
    		value: '=',
    		minlength: '@',
    		maxlength: '@',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		textareaClass:'@',
            cssStyle: '@'
     	},
     	controller: function($scope) {
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
     		+ '<div class="{{ inputClass }}">'
		    + '<textarea name="mT" class="form-control input-sm" rows="{{ rows }}" ng-model="value" ng-minlength="{{ minlength }}" ng-maxlength="{{ maxlength }}" ng-required="{{ required }}" ng-disabled="isDisabled()"></textarea>'
		    + '</div>'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mT.$valid }">{{ tip | translate }}</span>'
		    + '</div></ng-form>'
  };
});

app.directive('myPhone', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		label: '@',
     		tip: '@',
    		value: '=',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		inputClass:'@'
     	},
     	controller: function($scope) {
     		$scope.phonePattern =/^(48( )?)?\d{3}( )?\d{3}( )?\d{3}$/;
     		
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
     		+ '<div class="{{ inputClass }}">'
		    + '<input name="mI" type="text" class="form-control input-sm" ng-model="value" ng-pattern="phonePattern" ng-required="{{ required }}" ng-disabled="isDisabled()" />'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mI.$valid }">{{ tip | translate }}</span>'
		    + '</div>'
		    + '</div></ng-form>'
  };
});

app.directive('myNip', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		label: '@',
     		tip: '@',
    		value: '=',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		inputClass:'@'
     	},
     	controller: function($scope) {
     		$scope.nipPattern = /^\d{10}$/;
     		
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
     		+ '<div class="{{ inputClass }}">'
		    + '<input name="mI" type="text" class="form-control input-sm" ng-model="value" ng-pattern="nipPattern" ng-required="{{ required }}" ng-disabled="isDisabled()">'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mI.$valid }">{{ tip | translate }}</span>'
		    + '</div>'
		    + '</div></ng-form>'
  };
});

app.directive('myRegon', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		label: '@',
     		tip: '@',
    		value: '=',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		inputClass:'@'
     	},
     	controller: function($scope) {
     		$scope.regonPattern = /^\d{9}(\d{5})?$/;
     		
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
     		+ '<div class="{{ inputClass }}">'
		    + '<input name="mI" type="text" class="form-control input-sm" ng-model="value" ng-pattern="regonPattern" ng-required="{{ required }}" ng-disabled="isDisabled()" />'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mI.$valid }">{{ tip | translate }}</span>'
		    + '</div>'
		    + '</div></ng-form>'
  };
});

app.directive('myZipCode', function () {
	return {
    	restrict: "E",
    	replace: true,
     	scope: {
     		label: '@',
     		tip: '@',
    		value: '=',
    		required: '@',
    		disabled: '@',
    		labelClass:'@',
    		inputClass:'@'
     	},
     	controller: function($scope) {
     		$scope.zipCodePattern = /^\d{2}\-\d{3}$/;
     		
     		$scope.isDisabled = function() {
     			return $scope.disabled === "true";
     		};
     	},
     	template: '<ng-form name="nF"><div class="form-group">'
     		+ '<label class="{{ labelClass }}">{{ label | translate }}</label>'
     		+ '<div class="{{ inputClass }}">'
		    + '<input name="mI" type="text" class="form-control input-sm" ng-model="value" ng-pattern="zipCodePattern" ng-required="{{ required }}" ng-disabled="isDisabled()" />'
		    + '<span class="formError" ng-class="{ \'notDisplayed\' : nF.mI.$valid }">{{ tip | translate }}</span>'
		    + '</div>'
		    + '</div></ng-form>'
  };
});

app.directive('myReqAddress', function (BaseService) {
	return {
	    restrict: "E",
	    replace: true,
	    scope: {
	    	address: '=',
	    	stateOptions: '=',
	    	disabled: '@'
	    },
        controller: function($scope) {
     		$scope.$watch("address.zipCode", function(newValue, oldValue) {
     			if (newValue === oldValue || newValue === null || newValue === undefined || newValue.length !== 6) {
     				return;
     			}
     			BaseService.post(LegalSpace.config.url.zipCode.get, newValue).then(function(response) {
 					var zipCode = response;
 	 				if (zipCode.idZipCode !== 0) {
 	 					$scope.address.state.idState = zipCode.state.idState;
 	 				}
     			});
     		});
     		
     		$scope.$watch("address.state.idState", function(newValue, oldValue) {
     			if (newValue === oldValue || newValue === null) {
     				return;
     			}
     			for (var i in $scope.stateOptions) {
     				if ($scope.stateOptions[i].id == newValue) {
     					$scope.address.state.name = $scope.stateOptions[i].name;
     					break;
     				}
     			}
     		});
     	},
	    template: '<div>'
	    	+ '<my-input type="text" label="COMMON.ADDRESS.STREET" tip="TOOLTIP.REQ_MIN3_MAX150" value="address.street" minlength="3" maxlength="150" required="true" disabled="{{ disabled }}" label-class="control-label" input-class="control-label"></my-input>'
	    	+ '<my-input type="text" label="COMMON.ADDRESS.NUMBER" tip="TOOLTIP.REQ_MIN1_MAX50" value="address.number" minlength="1" maxlength="50" required="true" disabled="{{ disabled }}" label-class="control-label" input-class="control-label"></my-input>'
	    	+ '<my-input type="text" label="COMMON.ADDRESS.APARTMENT" tip="TOOLTIP.MAX25" value="address.apartment" minlength="" maxlength="25" required="false" disabled="{{ disabled }}" label-class="control-label" input-class="control-label"></my-input>'
	    	+ '<my-zip-code label="COMMON.ADDRESS.ZIP_CODE" tip="TOOLTIP.ZIP" value="address.zipCode" required="true" disabled="{{ disabled }}" label-class="control-label" input-class="control-label"></my-zip-code>'
	    	+ '<my-input type="text" label="COMMON.ADDRESS.CITY" tip="TOOLTIP.REQ_MIN3_MAX100" value="address.city" minlength="3" maxlength="100" required="true" disabled="{{ disabled }}" label-class="control-label" input-class="control-label"></my-input>'
	    	+ '<my-select label="COMMON.ADDRESS.STATE" tip="TOOLTIP.REQ" value="address.state.idState" options="stateOptions" required="true" disabled="{{ disabled }}" label-class="control-label criteriaLabel" select-class="control-label"></my-select>'
	    	+ '</div>'
	};
});
