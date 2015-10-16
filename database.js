CREATE TABLE center
(
CentreName varchar(100) NOT NULL,
CentreCode varchar (50),
no_of_sheet INT(11),
city varchar(25),
state varchar(25),
contact varchar(25),
email varchar(25),
university_code int(11),
PRIMARY KEY (CentreCode)
);
// student 
CREATE TABLE student
(
FirstName varchar(255) NOT NULL,
MiddleName varchar(255),
LastName varchar(255) NOT NULL,
Email varchar(255),
Phone varchar(255),
StreetAddress varchar(255),
City varchar(50),
State varchar(50),
Pin varchar(50),
Photo varchar(255),
Signature varchar(255)
PRIMARY KEY (Email)
);
// new Admitcard 
CREATE TABLE AdmitCard
(
Roll_no varchar(50),
CentreCode varchar (50) NOT NULL,
university_code int(11) NOT NULL, 
Student_Name varchar(100) NOT NULL,
Father_Name  varchar(100) NOT NULL,
Date_Of_Exam varchar(50),
Gender varchar(50),
Category varchar(50),
Exam_Time time,
Address varchar(255),
Photo varchar(255),
subject varchar(23),
Signature varchar(255),
PRIMARY KEY (Roll_no)
);
//
CREATE TABLE institute
(
university_name varchar(255) NOT NULL,
university_code varchar(255),
Email varchar(255),
Address varchar(255),
contact varchar(50),
PRIMARY KEY (university_code)
);

//  this data should be come with payload when user click on fillFrom

Roll_no
university_code
Student_Name
Father_Name
Photo
Signature
http://blog.ragingflame.co.za/2014/12/16/building-a-simple-api-with-express-and-bookshelfjs : All operation with bookshelf