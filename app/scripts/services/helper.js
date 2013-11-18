angular.module('MyApp')
.service('Helper', function () {
    // todo description
    function __ (obj, properties, value) {
        var property = properties.shift();

        if (typeof property === 'undefined') { 
            return obj;
        }
        
        if (typeof obj[property] === 'undefined') {
            if (properties.length > 0) {
                obj[property] = {};
            }
            else {
                obj[property] = value;
                return obj;
            }
        }

        __(obj[property], properties, value);    
        return obj;
    };

    return {
        __: __
    };
});