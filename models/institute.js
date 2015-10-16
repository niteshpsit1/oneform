var bookshelf = require("../config/bookshelf");

var Institute = bookshelf.Model.extend({
  tableName: 'institute'
});

module.exports = Institute;