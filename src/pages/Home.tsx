import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Todo App</h1>
      <p>Manage your tasks efficiently</p>
      <Link to="/todos" className="btn">
        View Todos
      </Link>
    </div>
  );
};

export default Home;