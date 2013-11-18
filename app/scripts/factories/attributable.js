angular.module('MyApp')
.factory('Attributable', ['Helper', function (Helper) {
    return {

        set: function (key, value, silent) {
            var attrs, changes;

            changes = [];

            if (angular.isObject(key)) {
                silent = arguments[1] || false;
                attrs = key;
            }
            else {
                (attrs = {})[key] = value;
            }

            for (attr in attrs) {
                // in case of setting value by object path  Ex: person.name = 'John'
                // only if attributes have person object already
                // !!! not tested code
                if (attr.indexOf('.') !== -1) {
                    var root = _.first(attr.split('.'));
                    // debugger
                    if (angular.isUndefined(this.attributes[root])) { return; }

                    var obj = Helper.__({}, _.pull(attr.split('.'), root), attrs[attr]);
                    this.attributes[root] = _.defaults(obj, this.attributes[root]);
                    changes.push(attr);
                    
                }
                else if (!_.isEqual(this.attributes[attr], attrs[attr])) {
                    this.attributes[attr] = attrs[attr];
                    changes.push(attr);
                }
            }

            // Trigger all relevant attribute changes.
            if (!silent) {
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:'+changes[i], this, attrs[changes[i]]);
                }
            }
        },

        get: function (key) {
            return this.attributes[key];
        },

        // Returns `true` if the attribute contains a value that is not null
        // or undefined.
        has: function(attr) {
            return this.get(attr) != null;
        },

        // Get the HTML-escaped value of an attribute.
        escape: function(attr) {
            return _.escape(this.get(attr));
        }
   };
}]);