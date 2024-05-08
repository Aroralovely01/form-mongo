// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
EmpSchema = new Schema({
    name : String,
 phone : String,
   email : String,
   address : String,
   salary:String

});
module.exports = mongoose.model('Persons', EmpSchema);