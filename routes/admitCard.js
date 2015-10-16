var Student = require('../models/students');
var Institute = require('../models/institute');
var Center = require('../models/center');
var AdmitCard = require('../models/admitCard');
var api =require('../api/api');
var _ = require('lodash');
module.exports = function(server){
	//	@ this route used when the user click on button fill the form 
	// 	@ then the data in the form will be filled automatically 
	//  @ that is previously stored in database
	server.route({
		path:'/fillForm/{studentId}/{university_code}',
		method:'GET',
		handler: function(request, reply){
			Student.forge({Email:request.params.studentId}).fetch()
				.then(function(studentData){
					console.log(studentData);
					Institute.forge({university_code:request.params.university_code}).fetch()
						.then(function(instituteData){
							reply(studentData.toJSON());
						})
						.catch(function(err){
							console.log(err);
							reply('error');
						});
				})
				.catch(function(err){
					console.log(err);
					reply('error');
				});
			}
	});
	//
	//
	//
	//
	server.route({
		path:'/admidCard/fillForm',
		method:'POST',
		handler: function(request, reply){
			Center.forge().where({university_code:11}).fetchAll()
				.then(function(center){
					if(center){
						var allottedCollege;
						_.forEach(center.models,function(object, index){
							if (object.attributes.city === request.payload.city && object.attributes.no_of_sheet > 0) {
								allottedCollege = object.attributes;
							};
						});
						if(!allottedCollege){
							_.forEach(center.models,function(object, index){
								if (object.attributes.no_of_sheet > 0) {
									allottedCollege = object.attributes
								};
							});
						}
						payload = {};
						payload.Roll_no = "124458m";
						payload.Student_Name = request.payload.FirstName+" "+request.payload.MiddleName+" "+request.payload.LastName;
						payload.Father_Name = request.payload.Father_Name;
						payload.CentreCode = allottedCollege.CentreCode;
						payload.university_code = request.payload.university_code;
						payload.Address = allottedCollege.contact +" "+allottedCollege.city;
						payload.Date_Of_Exam = "11/11/20146";
						payload.Gender = request.payload.Gender;
						payload.Category = request.payload.Category;
						payload.Exam_Time = "8:00";
						payload.subject = "MCA";
						payload.Photo = request.payload.Photo;
						payload.Signature = request.payload.Signature;
						console.log(payload);
						api.post("/admidCard/fillForm", payload, function(data){
							AdmitCard.forge(payload).save().then(function(admitCardGenerated){
								if(admitCardGenerated){
									Center.forge({CentreCode:admitCardGenerated.attributes.CentreCode,university_code:admitCardGenerated.attributes.university_code})
									.fetch({require:true})
										.then(function(center){centerObject=JSON.parse(JSON.stringify(center)); center.where({CentreCode:admitCardGenerated.attributes.CentreCode}).destroy()
											.then(function(data){
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
														reply(admitCardGenerated);
											})
											.otherwise(function(err){
												console.log(err);
												reply('error can allotte seat');
											});
										});
											
									})
									.otherwise(function(err){
										console.log(err);
										if (err.message === 'EmptyResponse') {
											reply("no seat available");
										}
										reply('error');
									});
								}
								
								console.log(data);
							}).catch(function(err){
								reply(err);
							});
						});
					}
				})
				.catch(function(err){

					console.log(err);
					console.log('err');
					reply(err);
				});
		}
	});
}