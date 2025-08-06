import React from 'react';
import{Link} from 'react-router-dom';
import Hero from '../../assests/images/hero.gif';
import "./Landing.css"
const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
        <h1>
          <span className='tagLine1'>Organize work and life </span>
          <span className='tagLine2'>finally</span>
        </h1>
        <p>
        Type anything into the task field and TodoLists<br />
        one-of-a-kind natural language recognition will instantly fill your to-do list.
        </p>
        <Link className='btn red' to="/register">Register Now!</Link>
        <Link className='btn blue' to="/login">Login</Link>
      </div>
      <div className=''>
      <img src={Hero} alt='heroimage' width={'100%'} height={515}/>
      </div>
    </div>
   
  )
}

export default Landing