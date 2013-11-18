angular.module('MyApp')
.provider('MyClass', function () {

    var globalOptions = {};
    var defaults = {};

    // The `options({})` allows global configuration of widgets made out of this type in the application.
    //
    // angular.module('App', [], function($MyClassProvider){
    //   $MyClassProvider.options({modalSize: {width: 200, heigth: 200}});
    // });
    this.options = function(value){
        globalOptions = value;
    };

    this.$get = ['$log',
    function ($log) { // <==== preffix ====
        
        var defaultAttributes = {
            title: 'new widget'
        };

        // ===========================
        // = WIDGET'S CLASS INSTANCE =
        // ===========================
        function MyClass (opts, attributes) {            
            var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);

            this.message = 'Hello from myClass';

            this.attributes = {};
            
            var attrs = attributes || {};
            attrs = _.defaults(attrs, defaultAttributes);
            this.set(attrs);

            this.options.scope.$watch('MyClass.attributes.title', function (newTitle, oldTitle) {
                console.log(newTitle);
            });
        }

        
        // place your widget's code here...

        // ===========================

        return MyClass;
    }]; // <==== suffix ====
}); 