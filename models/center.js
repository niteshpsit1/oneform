var bookshelf = require("../config/bookshelf");

var Center = bookshelf.Model.extend({
  tableName: 'center'
});

module.exports = Center;