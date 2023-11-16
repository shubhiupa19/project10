import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';

const Navbar = ({ onSearch }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
       setSearchTerm(e.target.value);
        onSearch(e.target.value); // call the passed onSearch function
      };
  return (
    <nav className='navbar'>
         <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Posts" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-post">Create New Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
