const userModel = require("../model/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
//register
const registerController=async(req, res)=>
{
 try{
const {username,email,password}=req.body;
//validation
if(!username||!email||!password)
{
    return res.status(500).send({
        success:false,
        message:'Please Provide all fields',
    });
}
//checking unique email 
const existinguser=await userModel.findOne({email})
if(existinguser)
{
    return res.status(500).send({
        success:false,
        message:'user already exist',
    });
}
const salt =  await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(password,salt);
//saving user
const newUser = new userModel({username,email,password:hashedPassword});
await newUser.save();

res.status(201).send({
    success:true,
    message:'user registered successfully'
});
 }
 catch(error)
 {
  console.log(error);
  res.status(500).send({
    success:false,
    message:'Register API',
    error,
  });
 }
};

//login 
const loginController=async(req,res)=>
{
try{
    const {email,password}=req.body;
    //finding user
    const user=await userModel.findOne({email});

    //validation
    if(!user)
    {
        return res.status(404).send({
            success:false,
            message:'Invalid email or password',
        });
    }

    //match password
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(500).send({
        success:false,
        message:' invalid credential',
    });
    }

    // generating token 
    const token = await JWT.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"1d",});
    res.status(200).send({
        success:true,
        message:'Login succesfully',
        token,
        user:{
            id:user._id,                     //hiding password
            email: user.email,
            username:user.username,
        },
    });
}
catch(error)
{
     console.log(error);
    res.status(500).send({
        
        success:false,
        message:'login api',
        error,
    });
}
};
module.exports={registerController,loginController};