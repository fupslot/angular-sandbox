angular.module('MyApp')
.factory('MyWidget', ['Widget', function (Widget) {

    var myPrivateMethod = function () {
        this.cache.set('someData', 'cached string data');
        alert('data has been added');
    };

    var onTitleChange = function () {
        console.log(arguments);
    };

    var onTitleValidate = function (value, previous, cancel) {
        console.log(value, previous);
        if (value == '') { return cancel(); }
        console.log('title_1');
    };
    
    var MyWidget = Widget.extend({
        tabs: ['viz'],

        defaults: {
            title: 'MyWidget',
            name: 'Amir',
            age: '37',

            viz: {
                chart: 'pie',
            }
        },

        initialize: function () {
            this.bind('title');
            this.validate('title', onTitleValidate);

            this.bind('viz.chart');
            this.validate('viz.chart', function (value, previous, cancel) {
                if (value.length < 3) { return cancel();}
                console.log(value);
            });
            // this.on('change:viz.chart', function (sender, value) {
            //     console.log(value);
            // });

            this.set('viz.chart', 'notpie');
        },

        foo: function () {
            this.save();
        }
    });

    return MyWidget;
}]);