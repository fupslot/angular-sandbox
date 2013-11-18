angular.module('MyApp')
.service('Document', ['$http', 'Events', function ($http, Events) {

    function http_error () {
        console.log('Opps');
    }

    function Document (model) {

        if (angular.isObject(model)) {
            this.model = angular.extend({}, this.model, model);
        }

        this.on('http_error', http_error);
    }

    Document.prototype.save = function() {
        var self = this;
        $http.post('/doc', this.model)
        .error(function (data) {
            self.trigger('http_error', data);
        });
    };

    Document.prototype.setTitle = function(title) {
        this.model.title = title;
        this.save();
    };

    Document.prototype = $.extend(Document.prototype, Events);


    return new Document({id:'001',name:'new document'});
}]);