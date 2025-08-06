import {useEffect, useState } from 'react'
import React from 'react'
import Navbar from '../../components/Layout/Navbar'
import PopModel from '../../components/PopModel'
import TodoServices from '../../services/TodoServices'
import Card from '../../components/Card/Card'
 

 
const Home = () => {
  const [showModel,setShowModel]=useState(false);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [allTask,setAllTask]=useState('');

    // Function to fetch all tasks
    const fetchTasks = async () => {
      try {
        const res = await TodoServices.getAllTodos(); // API call
        setAllTask(res.data); // Update the state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    useEffect(() => {
      fetchTasks();
    }, []);

  //handle model
 const openModelHandler=()=>
 {
  setShowModel(true);
 
 };

  useEffect(()=>{
  const userData = JSON.parse(localStorage.getItem('todoapp'));
  const id=userData&&userData?.user.id;
  console.log(id);
  const getUserTask= async()=>{
    try{
      const {data}=await TodoServices.getAllTodo(id);
      console.log(data);
      setAllTask(data?.todos)
    }
    catch(error)
    {
      console.log(error);
      
    }
  };
  getUserTask();
},[])

  return (
    <>
    <Navbar/>
     <div className='container'>
      <div className='add-task'>
        <h1>Your Task</h1>
        <input type='search' placeholder='search Your task'/>
        <button className='btn btn-primary' onClick={openModelHandler}>Create Task <i className="fa-solid fa-plus"></i></button>
      </div>
      {allTask&&<Card allTask={allTask} fetchTasks={fetchTasks}/>}
     { /* ======================model=====================*/}
     <PopModel showModel={showModel}
     setShowModel={setShowModel}
     title={title}
     setTitle={setTitle}
     description={description}
     setDescription={setDescription}/>
     </div>
    </>
  )
}

export default Home