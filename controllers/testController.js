const testingController =(req , res)=>
{
 res.status(200).send('<h1> Response from MVC pattern </h1>')   //MVC(model , view, controller)
};

//exporting modules
module.exports={testingController}