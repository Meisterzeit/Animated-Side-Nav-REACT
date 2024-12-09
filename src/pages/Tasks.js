import React, { useEffect, useState, useCallback } from 'react'; 
import axios from 'axios'; 
import TaskItem from '../components/TaskItem'; 
import './Tasks.css'; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const loadTasks = useCallback(() => {
    setLoading(true); 
    setError(null); 
    axios
      .get('http://localhost:3008/api/tasks/') 
      .then((response) => {
        setTasks(response.data); 
      })
      .catch((err) => {
        setError(err.message); 
      })
      .finally(() => setLoading(false)); 
  }, []);

  useEffect(() => {
    loadTasks(); 
  }, [loadTasks]); 

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      {loading && <p className="loading">Loading tasks...</p>} 
      {error && <p className="error">Error: {error}</p>} 
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} number={index + 1} /> 
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
