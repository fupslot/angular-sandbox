angular.module('MyApp')
.factory('Attributable', function () {
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
                if (!_.isEqual(this.attributes[attr], attrs[attr])) {
                    this.attributes[attr] = attrs[attr];
                    changes.push(attr);
                }
            }

            // Trigger all relevant attribute changes.
            if (!silent) {
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:'+changes[i], this, this.get(changes[i]));
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
});