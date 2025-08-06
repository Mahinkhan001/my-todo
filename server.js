const express= require('express');
const morgan =require('morgan');
const dotenv =require('dotenv');        //for security
const cors=require('cors');
const connectDB = require('./config/db');


//config env
dotenv.config();

//db connect
connectDB();

//rest object
const app= express();

//middlwr
app.use(express.json());
app.use(cors());                      // for connecting two ports frontnd and bcknd
app.use(morgan("dev"));              //for method API chking 


//routes
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/todo', require("./routes/todoRoutes"));
app.use('/api/v1/test', require('./routes/testRoutes'));


//ports
const PORT=process.env.PORT;

//listen
app.listen(PORT,()=>{
    console.log(`Node server running on ${process.env.DEV_MODE} mode on port number ${PORT}`);
});