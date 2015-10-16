var Q = require('q'),
	request = require("request"),
	get = Q.nbind(request.get,request),
	post = Q.nbind(request.post,request),
	config = require('../config/development');

var  options ={};
options.url = config.port;
options.headers ={
	'Content-Type': 'application/json'
};

module.exports = {
	get: function(endpoint, callback){
		options.url = options.url + endpoint;
		request.get(options, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			console.log(body)
    			callback(body);
 			}else{
 				console.log(error);
 				console.log(response.statusCode);
 			}
		})
	},
	post: function(endpoint, body, callback){
		options.url = options.url + endpoint;
		options.json = body;
		request.post(options, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			callback(body);
 			}else{
 				console.log(response.statusCode);
 			}
		})
	}
}