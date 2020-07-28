  
const express = require ('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var mongoose =require('./database/mongoose');
app.use(express.json());
app.use(cors());
const employee = require('./EmployeeController/employeeinfo');
app.use(bodyParser.json());
app.use('/api', employee)
app.listen(3001,() => console.log('server started at port 3001'));