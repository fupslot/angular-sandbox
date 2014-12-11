'use strict';

angular.module('MyApp')
.config(function ($provide) {
    $provide.decorator('$log', function ($delegate) {
        $delegate.clear = function () {
            console.clear();
        };
        $delegate.happy = function (msg, color) {
            console.log("%c" + msg, "color:" + color + "; font-size: 18px; font-weight: bold;");
        };
        return $delegate;
    });
})
.service('FormBuilderSrv', ['$compile', function ($compile) {
    var factory = {};

    // Build a panel
    // -------------
    factory.buildPanel = function (scope, node) {
        var newScope = scope.$new();
        newScope.node = node;
        return $compile('<div cd-panel cd-params="node"></div>')(newScope);
    };

    // Build a group
    // -------------
    factory.buildGroup = function (scope, node) {
        var newScope = scope.$new();
        newScope.node = node;
        return $compile('<div cd-group cd-params="node"></div>')(newScope);
    };

    factory.eachChildNode = function (obj, callback) {
        var nodes = [];
        if ('childNodes' in obj) nodes = obj.childNodes;
        if ('length' in obj) nodes = obj;
        angular.forEach(nodes, callback);
    };

    return factory
}])
.controller('DirectiveCtrl', function ($scope, $http, $compile) {

    $scope.tree = [{
        nodeType: 0, // panel
        childNodes: [
            {
                nodeType: 1, // group
                childNodes: [],
                attributes: {
                    groupType: 0,
                    styles: {
                        backgroundColor:'#f0f'
                    }
                }
            }
        ],
        attributes: {
            styles: {
                backgroundColor:'yellow'
            }
        }
    },
    {
        nodeType: 1, // group
        childNodes: [

            {
                nodeType: 0, // panel
                childNodes: [],
                attributes: {
                    styles: {
                        backgroundColor:'green'
                    }
                }
            },

            {
                nodeType: 0, // panel
                childNodes: [],
                attributes: {
                    styles: {
                        backgroundColor:'blue'
                    }
                }
            },

            {
                nodeType: 0, // panel
                childNodes: [],
                attributes: {
                    styles: {
                        backgroundColor:'yellow'
                    }
                }
            }

        ],
        attributes: {
            groupType: 1, // column type
            styles: {
                backgroundColor:'#f0f'
            }
        }
    }];

    $scope.isDone = true;
    $scope.doneFn = function(){
        $scope.isDone = true;
    };
})
.directive('cdParams', function ($log) {
    return {
        scope: true,
        controller: function($scope, $attrs) {
            var params = $scope.$eval($attrs.cdParams);
            
            Object.defineProperty(this, 'params', {
                get: function(){
                    return params;
                }
            });
        }
    };
})
.directive('cdLayout', ['$compile', 'FormBuilderSrv',
function ($compile, FormBuilder) {
    return {
        scope: true,
        require: '^cdParams',
        link : function (scope, el, attrs, cdParams) {
            var tree = cdParams.params;

            FormBuilder.eachChildNode(tree, function (node) {
                if (node.nodeType === 0) {
                    var panelEl = FormBuilder.buildPanel(scope, node); // panel
                    el.append(panelEl);
                }
                if (node.nodeType === 1) {
                    var groupEl = FormBuilder.buildGroup(scope, node); // group
                    el.append(groupEl);
                }
            });
        }
    };
}])
.directive('cdGroup', ['FormBuilderSrv', function (FormBuilder) {
   return {
        require: '^cdParams',
        scope: true,
        transclude: true,
        link: function (scope, el, attrs, cdParams) {
            var params = cdParams.params;
            var groupType = params.attributes.groupType;
            
            el.addClass('group');
            el.css(params.attributes.styles);

            // Groups Columns
            el.addClass((groupType === 1) && 'group-columns');

            FormBuilder.eachChildNode(params, function (node) {
                if (node.nodeType === 0) {
                    var panelEl = FormBuilder.buildPanel(scope, node); // panel

                    el.append(panelEl);
                }
            });
        },
    }
}])
.directive('cdPanel', ['FormBuilderSrv', function (FormBuilder) {
    return {
        require: '^cdParams',
        scope: true,
        transclude: true,
        link: function (scope, el, attrs, cdParams) {
            var params = cdParams.params;

            el.addClass('panel');
            el.css(params.attributes.styles);

            FormBuilder.eachChildNode(params, function (node) {
                if (node.nodeType === 1) {
                    var groupEl = FormBuilder.buildGroup(scope, node); // group
                    el.append(groupEl);
                }
            });
        }
    }
}]);
