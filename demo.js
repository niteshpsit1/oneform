var _ = require('lodash');
var on=[{},{}];
console.log(on);

_.forEach(on,function(object,i) {
	console.log(object);
	console.log('=========',i-1);
})