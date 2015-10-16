var Institute = require('../models/institute');

module.exports = function(server){
	//@ this route is used for register the institute
	server.route({
		path:'/register/institute',
		method:'POST',
		handler: function(request, reply){
		Institute.forge({
				university_name:request.payload.university_name,
				university_code:request.payload.university_code,
				Address:request.payload.Address,
				Email:request.payload.Email,
				contact:request.payload.contact,
				}).save().then(function(data){
                reply(data);
			}).catch(function(err){
				console.log(err);
				reply(err);
			});
		}
	});
	// @   this route for get the university detail
	server.route({
		path:'/institute/{university_code}',
		method:'POST',
		handler: function(request, reply){
		Institute.forge().where({university_code:request.params.university_code}).fetch().then(function(data){
                reply(data);
			}).catch(function(err){
				console.log(err);
				reply(err);
			});
		}
	});
}