import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedSideNav from './components/AnimatedSideNav';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

const App = () => {
  return (
    <Router>
      <div>
        <AnimatedSideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
