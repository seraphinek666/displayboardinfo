/**
 * Created by Maciej on 14.04.14.
 */
app.directive('myDoubleTreePanel', function (){
    return {
        restrict: "E",
        replace: true,
        scope: {
            left: '=',
            right: '=',
            maxDepth: '@', //depth for choosen elements, example in Rules (maxdepth=1)
            label: '@'
        },
        controller: function($scope) {
            var ADD_TO_CURRENT_LIST = 1;
            $scope.leftSelected = [];
            $scope.rightSelected = [];

            addToTree = function(tree, element, depth) {
                var currentDepth = depth - 1;
                var result = 0
                if(currentDepth > 0) {
                    for(var i = 0; i < tree.children.length; i++) {
                        result += addToTree(tree.children[i], element, currentDepth);
                    }
                } else {
                    tree.children.forEach(function(branch) {
                        if(element.parentId === branch.id) {
                            branch.children.push(element);
                            return 1;
                        }
                    });
                }
                return result;
            };

            removeFromTree = function(tree, element, depth){
                var currentDepth = depth - 1;
                var result = 0;
                if(currentDepth > 0) {
                    for(var i = 0; i < tree.children.length; i++) {
                        result += removeFromTree(tree.children[i], element, currentDepth);
                    }
                } else {
                    tree.children.forEach(function(branch) {
                        if(element.parentId === branch.id) {
                            var children = branch.children;
                            for(var i = 0; i < children.length; i++) {
                                if(children[i].id === element.id) {
                                    branch.children.splice(i,1);
                                    return 1;
                                }
                            }
                        }
                    });
                }
                return result;
            };

            checkExistInList = function(list, node) {
                for(var i = 0; i < list.length; i++) {
                    if(node.id === list[i].id) {
                        return i;
                    }
                }
                return -1;
            }

            checkExistInTree = function(tree, node, depth) {
                var currentDepth = depth - 1;
                var result = 0;
                if(currentDepth > 0) {
                    for(var i = 0; i < tree.children.length; i++) {
                        result += removeFromTree(tree.children[i], node, currentDepth);
                    }
                } else {
                    tree.children.forEach(function(branch) {
                        if(node.parentId === branch.id) {
                            var children = branch.children;
                            for(var i = 0; i < children.length; i++) {
                                if(children[i].id === node.id) {
                                    result =  i + 1;
                                    break;
                                }
                            }
                        }
                    });
                }
                return result;
            }

            $scope.moveRight = function() {
                $scope.leftSelected.forEach(function(element){
                    element.class = '';
                    addToTree($scope.right, element, $scope.maxDepth);
                    removeFromTree($scope.left, element, $scope.maxDepth);
                });
                $scope.leftSelected = [];
            };

            $scope.moveLeft = function() {
                $scope.rightSelected.forEach(function(element){
                    element.class = '';
                    addToTree($scope.left, element, $scope.maxDepth);
                    removeFromTree($scope.right, element, $scope.maxDepth);
                });
                $scope.rightSelected = [];

            };

            $scope.$on('nodeSelected', function (event, node, context) {
                if(node.state === "leaf") {
                    if(node.class && node.class === 'mySelectedNode') {
                        node.class = '';
                        var positionInRight = checkExistInList($scope.rightSelected, node);
                        if(positionInRight > -1) {
                            $scope.rightSelected.splice(positionInRight,1);
                        } else {
                            $scope.leftSelected.splice(checkExistInList($scope.leftSelected, node),1);
                        }
                    } else {
                        node.class = 'mySelectedNode';
                        var pos = checkExistInTree($scope.right, node, $scope.maxDepth) - 1;
                        if(pos > -1) {
                            $scope.rightSelected.push(node);
                        } else {
                            $scope.leftSelected.push(node);
                        }
                    }
                }
            });
        },
        template: '<div class="form-group">'
            + ' <label class="control-label">{{label | translate}}</label>'
            + '     <div class="doubleContainer">'
            + '         <div class="doubleTreePanel form-control col-lg-5">'
            + '             <oci.treeview tree="left">'
            + '                 <span ng-class="tree.class">{{ tree.label }}</span>'
            + '             </oci.treeview>'
            + '         </div>'
            + '         <div class="doubleTreeButtonsPanel col-lg-2">'
            + '             <button class="btn2" ng-click="moveRight()">>></button>'
            + '             <button class="btn2" ng-click="moveLeft()"><<</button>'
            + '         </div>'
            + '         <div class="doubleTreePanel form-control col-lg-5">'
            + '             <oci.treeview tree="right">'
            + '                 <span ng-class="tree.class">{{ tree.label }}</span>'
            + '             </oci.treeview>'
            + '         </div>'
            + '     </div>'
            + '</div>'
    };
});
