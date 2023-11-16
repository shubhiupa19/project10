// src/pages/CreatePostPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error} = await supabase.from('posts').insert([{ title, content }]);
    if (!error) 
    {
        navigate('/');
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Post Content" />
        <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
