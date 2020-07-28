var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema({
    employee_name: {type: String},
    employee_email: {type: String},
    department: {type: String},
    gender: {type: String},
    dob: {type: Date}
    });

mongoose.model('Employee',EmployeeSchema);