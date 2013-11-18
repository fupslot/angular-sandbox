var string = 'test.test.test';
var dotIdx = string.indexOf('.');
console.log(string.substr(0, string.indexOf('.')));


return
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
}

var obj = __({}, ['person','name'], {first: 'john'});
console.log(obj);

