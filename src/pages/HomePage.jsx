// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (data) setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="page">
      <h1>Stationery Forum</h1>
      
        {posts.map(post => (
          <div className = "posts" key={post.id}>
            <h3>{post.title}</h3> 
            <h4><Link to={`/post/${post.id}`}>More info!!</Link></h4>
            <p>Upvotes: {post.upvotes}</p>
          </div>
        ))}
      
    </div>
  );
};

export default HomePage;
