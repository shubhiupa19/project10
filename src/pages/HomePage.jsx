// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import './HomePage.css';

const HomePage = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [sortMethod, setSortMethod] = useState('created');


  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*');
      if (data) setPosts(data);
    };

    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortMethod === 'upvotes') {
      return b.upvotes - a.upvotes; // Sort by upvotes
    } else {
      return new Date(b.created_at) - new Date(a.created_at); // Sort by creation time
    }
  });

  const filteredAndSortedPosts = searchTerm
    ? sortedPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : sortedPosts;

   

    const handleSortChange = (method) => {
        setSortMethod(method);
      };

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

  return (
    <div className="page">
         <div className="header">
            <h1>Stationery Forum</h1>
        </div>

      <div className = "buttons">
        <button onClick={() => handleSortChange('created')} >Sort by Created Time</button>
        <button  onClick={() => handleSortChange('upvotes')}>Sort by Upvotes</button>
      </div>
      
        {filteredAndSortedPosts.map(post => (
          <div className = "posts" key={post.id}>
            <p> Created at: {formatDate(post.created_at)}</p>
            <h3>{post.title}</h3> 
            <h4><Link to={`/post/${post.id}`}>More info!!</Link></h4>
            <p>Upvotes: {post.upvotes}</p>
          </div>
        ))}
      
    </div>
  );
};

export default HomePage;
