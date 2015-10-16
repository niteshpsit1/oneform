var bookshelf = require("../config/bookshelf");

var AdmitCard = bookshelf.Model.extend({
  tableName: 'admitcard'
});

module.exports = AdmitCard;