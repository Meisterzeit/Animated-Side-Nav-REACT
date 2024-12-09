import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './AnimatedSideNav.css'; 

const AnimatedSideNav = () => {
  return (
    <div className="side-nav">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>
    </div>
  );
};

export default AnimatedSideNav;