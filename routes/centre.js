var Student = require('../models/students');
var AdmitCard = require('../models/admitCard');
var Center = require('../models/center');
var api =require('../api/api');
var q = require('Q');
module.exports = function(server){
	//	@ add new center with university code
	server.route({
		path:'/addcenter',
		method:'POST',
		handler: function(request, reply){
			new Center({
				CentreName:request.payload.CentreName,
				CentreCode:request.payload.CentreCode,
				no_of_sheet:request.payload.no_of_sheet,
				city:request.payload.city,
				state:request.payload.state,
				contact:request.payload.contact,
				email:request.payload.email,
				university_code:request.payload.university_code
			}).save().then(function(data){
				console.log(data);
				reply(data);
			}).catch(function(err){
				console.log(err);
				reply("error");
			});
		}
	});
	// @ delete a existing center 
	server.route({
		path:'/deleteCenter/{university_code}/{CentreCode}',
		method:'delete',
		handler: function(request , reply){
			Center.forge({CentreCode:request.params.CentreCode,university_code:request.params.university_code})
				.fetch({require:true})
					.then(function(center){center.where({CentreCode:request.params.CentreCode}).destroy()
						.then(function(){
							reply({err:true,data:{message:'center successfully deleted'}});
						}).otherwise(function(err){
							console.log(err);
							reply('error in deleting');
						});
					})
					.otherwise(function(err){
							console.log(err);
							if (err.message === 'EmptyResponse') {
								reply("no data found");
							}
							reply('error');
					});
		}
	});
	// @ decrease the available seat in center
	server.route({
		path:'/deteleSeat/{university_code}/{CentreCode}',
		method:'delete',
		handler: function(request , reply){
			console.log("============1");
			var centerObject;
			Center.forge({CentreCode:request.params.CentreCode,university_code:request.params.university_code})
				.fetch({require:true})
					.then(function(center){console.log("============2"); centerObject=JSON.parse(JSON.stringify(center)); center.where({CentreCode:request.params.CentreCode}).destroy()
						.then(function(data){
							console.log("============3");
							Center.forge()
								.save({
									CentreName:centerObject.CentreName,
									CentreCode:centerObject.CentreCode,
									no_of_sheet:(centerObject.no_of_sheet)-1,
									city:centerObject.city,
									state:centerObject.state,
									contact:centerObject.contact,
									email:centerObject.email,
									university_code:centerObject.university_code
								})
								.then(function(data){
									console.log("============4");
									reply("ok");
						})
						.otherwise(function(err){
							console.log("============5");
							console.log(err);
							reply('error can not delete');
						});
					});
						
				})
				.otherwise(function(err){
					console.log("============1");
					console.log(err);
					if (err.message === 'EmptyResponse') {
						reply("no data found");
					}
					reply('error');
				});
		}
	});
}