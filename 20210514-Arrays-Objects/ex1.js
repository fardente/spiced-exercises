function each(arrayOrObject, callback) {
    if (Array.isArray(arrayOrObject)) {
        for (var i = 0; i < arrayOrObject.length; i++) {
            callback(arrayOrObject[i], i);
        }
    } else if (typeof arrayOrObject === 'object') {
        for (var prop in arrayOrObject) {
            callback(arrayOrObject[prop], prop)
        }
    }
}



// Testing:

each({
    a: 1,
    b: 2
}, function(val, name) {
    console.log('The value of ' + name + ' is ' + val);
}); // logs 'the value of a is 1' and 'the value of b is 2'

each(['a', 'b'], function(val, idx) {
    console.log('The value of item ' + idx + ' is ' + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'