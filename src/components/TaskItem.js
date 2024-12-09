import React from 'react'; 
import './TaskItem.css'; 

const TaskItem = ({ task, number }) => { 
  const handleClick = () => {
    console.log(`Task clicked: ${task.id}`);
  };

  return (
    <li className="task-item" onClick={handleClick}>
      <span className="task-number">{number}.</span> 
      <span className="task-name">{task.name}</span> 
    </li>
  );
};

export default TaskItem;

