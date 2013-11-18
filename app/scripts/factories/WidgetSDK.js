angular.module('MyApp')
.factory('WidgetSDK', 

        ['$timeout', 
function ($timeout) {

    var SDK = {};

    // ========================
    // = SHOULD BE DEPRECATED =
    // ========================
    var sdkFunctions = [
        'onLoad',
        'runQuery',
        'onResize',
        'onMessage',
        'onEditorModalOpen',
        'onEditorModalChange',
        'onEditorModalClose',
        'onEditorModalQueryOpen',
        'onEditorModalQueryChange',
        'onEditorModalQueryClose',
        'isValidQuery',
        'isValidConfig',
        'onConfigChange'
    ];

    sdkFunctions.forEach(function (funcName) {
        if (angular.isUndefined(SDK[funcName])) {
            SDK[funcName] = angular.noop;
        }
    });
    // ========================


    var _api = SDK._api = {};

    return SDK;
}]);