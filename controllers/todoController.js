const todoModel =require("../model/todoModel");
const createTodoController=async (req,res)=>{
    try{
        //getting data
        const {title,description}=req.body
        if(!title||!description)
        {
            return res.status(500).send({
                success:false,
                message:'please provide title and description'
            })
        }
        const todo=new todoModel({title,description,createdBy});
        const result=await todo.save();  //saving todomodel data into result
        res.status(201).send({
            success:true,
            message:'your task has been created',
            result,
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in create todo api',
            error
        })
    }
};
//get todo
const getTodoController=async (req,res)=>{
    try{
        //get user id 
        const {id}= req.params     //defining route paramtrs
        //validate
        if(!id)
        {
             return res.status(404).send({
                success:true,
                message:'no user found'
            })
        }
        //finding task
        const todos=await todoModel.find({createdBy:userId});
        if(!todos)
        {
            return res.status(404).send({
                success:true,
                message:'you have no todos'
            })
        }
        //if todos find
        res.status(200).send({
            success:true,
            message:'your todos',
            todos,
        })
    }
    catch(error)
    {
        console.log(error) ;
        res.status(500).send({
            success:false,
            message:'Error in getting todo api',
            error
        });
    }
}


//delete api

const deleteTodoController=async(req,res)=>{
    try{
        
         const {id}=req.params
         if(!id){
            return res.status(404).send({
                success:false,
                message:'No todo found with hits id'
            });
         }
          //find id
          const todo=await todoModel.findByIdAndDelete({_id:id})
          if(!todo)
          {
            return res.status(404).send({
                success:false,
                message:'No task found'
            });
          }
          res.status(200).send({
            success:true,
            message:'Your task has been deleted'
          });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in delete todo api'
        })
    }
}
//update task

const updateTodoController=async(req,res)=>{
    try{
       const {id}=req.params
       if(!id){
        return res.status(404).send({
            success:false,
            message:'Please provide todo id'
        })
       }
       const data=req.body
       //update
       const todo = await todoModel.findByIdAndUpdate(id, { $set: data }, { new: true });
       res.status(200).send({
        success:true,
        message:'your task has been update',
        todo
       })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error In Update Todo Api'
        })
    }
}




module.exports={createTodoController,getTodoController,deleteTodoController,updateTodoController};