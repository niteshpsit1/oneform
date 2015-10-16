var bookshelf = require("../config/bookshelf");

var Student = bookshelf.Model.extend({
  tableName: 'student'
});

module.exports = Student;