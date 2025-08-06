const express=require('express');
const { createTodoController, getTodoController, deleteTodoController,updateTodoController } = require('../controllers/todoController');
const authMiddleware=require("../middlewares/authMiddleware")

const router=express.Router();

//creating todos route

router.post('/create',authMiddleware,createTodoController);


//getting todo (route)
router.post('/getAll/:userId',authMiddleware,getTodoController);
module.exports=router;

//delete todo

router.post('/delete/:id',authMiddleware,deleteTodoController);

//update todo
router.patch('/update/:id',authMiddleware,updateTodoController);

module.exports=router;