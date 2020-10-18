var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var TodoSchema = require('../models/todo');
var TodoModel = mongoose.model('todos');

router.post('/todos',function(req,res){
  console.log(req.body)
    var todoData = new TodoModel({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      date: new Date(),
    });
    todoData.save(function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: result
        })
      }

    });

});


router.get('/todos',async function(req,res){
  try{
      var todos = await TodoModel.find({})
      return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
  }catch(e){
      return res.status(400).json({status: 400, message: e.message});
  }
});

router.put('/todos',function(req,res){
    var query = {
      _id: req.body._id
    },
    update = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        date: new Date(), 
      }
    };
    TodoModel.updateMany(query, update, function (err, todo) {
        if (err) {
          console.error("err"+err)
          return res.status(400).json({
            message: 'Bad Request'
          });
        } else {
          res.json({
            status: 200,
            data: todo
          })
        }
  
      });
  
  
  });



  router.delete('/todos/:id',(req,res)=>{
    TodoModel.findByIdAndRemove(req.params.id,function(err,deletetodos){
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
})

module.exports=router;