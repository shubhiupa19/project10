// src/pages/CreatePostPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image_url, setImageUrl] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error} = await supabase.from('posts').insert([{ title, content, image_url }]);
    if (!error) 
    {
        navigate('/');
    }
  };

  return (
    <div className = "page">
      <h1>Create a New Post</h1><br/><br/>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Post Content" />
        <input type="text" value={image_url} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
