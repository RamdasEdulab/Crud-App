const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();
var EmployeeSchema = require('../models/Employee');
var EmployeeModel = mongoose.model('Employee')


router.post('/add-employee',function(req,res){
    var EmployeeData = new EmployeeModel({
        employee_name:req.body.employee_name,
        employee_email:req.body.employee_email,
        department:req.body.department,
        gender:req.body.gender,
        dob:req.body.dob
      });
      EmployeeData.save(function(err,result){
      if(err){
      console.error(err)
      return res.status(400).json({
      message:'bad request'
      });
      }else{
      res.json({
      status:200,
      data:result
     });
     }
    });
  });


  router.get('/', (req,res)=>{
    EmployeeModel.find((err, data) => {
            if (err) {
              return res.json(err)
            } else {
              res.json(data)
            }
          })
        })
        
router.get('/read-employee/:id',(req,res)=>{
    EmployeeModel.find({
        _id: req.params.id
        }).then(function(data){
            setTimeout(function(){
                res.json({
                    status : 200,
                    data:data
                })
            },500) 
        });
});


  router.put('/update-employee/:id',(req,res)=>{
    var Employee={
        employee_name:req.body.employee_name,
        employee_email:req.body.employee_email,
        department:req.body.department,
        gender:req.body.gender,
        dob:req.body.dob
    }
    EmployeeModel.findByIdAndUpdate(req.params.id,{$set:Employee},(err,employee)=>{
        if(err){
            console.error(err)
            return res.status(400).json({
              message:'bad request'
            });
          }else{
            res.json({
              status:200,
              data:employee
            });
          }

        });
    });


    router.delete('/delete-employee/:id',(req,res)=>{
        EmployeeModel.findByIdAndRemove(req.params.id,function(err,deleteemployee){
            if(err){
                res.json({
                    status : 400
                })
            }else{
                res.json({
                    status : 200
                })
            }
        })
    });

module.exports=router;