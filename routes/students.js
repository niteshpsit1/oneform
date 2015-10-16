var Student = require('../models/students');
var AdmitCard = require('../models/admitCard');
var api =require('../api/api');
var q = require('Q');
module.exports = function(server){
	//	@ get the college information based on college code	
	server.route({
		path:'/',
		method:'GET',
		handler: function(request, reply){
			api.get('/', function(data){
				reply(data);
			});
		}
	});
	//@ this route is used for register the student 
	server.route({
		path:'/register/students',
		method:'POST',
		handler: function(request, reply){
		new	Student({
				FirstName:request.payload.firstname,
				MiddleName:request.payload.middlename,
				LastName:request.payload.lastname,
				Email:request.payload.email,
				Phone:request.payload.phone,
				StreetAddress:request.payload.address,
				City:request.payload.city,
				State:request.payload.state,
				Pin:request.payload.pin}).save().then(function(data){
                reply(data.toJSON());
				console.log(data.toJSON());
			}).catch(function(err){
				console.log(err);
			});
		}
	});
	server.route({
		path:'/center',
		method:'POST',
		handler: function(request, reply){
			api.post('/center', request.payload, function(data){
				reply(data);
			}); 
		}
	});
	//@ this route fire when the user click on the button fill the fillForm 
	//@ first this route fetches the data from onformindia db based on email
	//@ then fetches the data of college based of unidersity code
	//@ from unidersity db
	//@ 
	server.route({
		path:'/fillForm',
		method:'GET',
		handler: function(request, reply){
			Student.where('Email','nitesh@gmail.com').fetch().then(function (data){
				var studentsData = data.toJSON();
				var instituteData;
				var admitCard = {};
				api.get('/fillForm',function(data){
					console.log(data);
					instituteData = JSON.parse(data);
					admitCard.Student_Name = studentsData.FirstName+" "+studentsData.MiddleName+" "+studentsData.LastName;
					admitCard.Exam_Date = '32131';
					admitCard.Exam_time = '12pm';
					admitCard.Address = studentsData.StreetAddress+" "+studentsData.City+" "+studentsData.State;
					admitCard.Photo = studentsData.Photo;
					admitCard.Signature = studentsData.Signature;
					reply(admitCard);
				});
			}).catch(function(err) {
				console.error(err);
			});
		}
	});
	//@ 
	server.route({
		path:'/fillForm',
		method:'POST',
		handler: function(request, reply){
			api.post('/fillForm', request.payload, function(data){
				new	AdmitCard({Roll_no:request.payload.Roll_no,
					Student_Name:request.payload.Student_Name,
					Father_Name:request.payload.Father_Name,
					Date_Of_Birth:request.payload.Date_Of_Birth,
					Gender:request.payload.Gender,
					Address:request.payload.Address,
					Photo:request.payload.Photo,
					Signature:request.payload.Signature,
					Category:request.payload.Category
				}).save().then( function(data){
					reply(data);
				}).catch(function(err){
					reply(err)
				});
			});
		}
	});
}