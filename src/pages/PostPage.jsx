// src/pages/PostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './PostPage.css';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id: stringId } = useParams();
  const id = parseInt(stringId, 10);
  const [trigger, setTrigger] = useState(false);
  const [triggerUpvotes, setTriggerUpvotes] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const navigate = useNavigate();

  const handleUpvote = async () => {
    const {data, error} = await supabase 
    .from('posts')
    .update({upvotes: post.upvotes + 1})
    .match ({id: post.id});

    if (data) setPost({ ...post, upvotes: data[0].upvotes + 1 });

    setTriggerUpvotes(prev => !prev);

  };

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await supabase.from('posts').select('*').eq('id', id).single();
      const commentsData = await supabase.from('comments').select('*').eq('post_id', id);
      if (postData.data) setPost(postData.data);
      if (commentsData.data) setComments(commentsData.data);
      console.log(postData)
    };

    fetchPost();
  }, [id, trigger, triggerUpvotes]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('comments').insert([
      { content: newComment, post_id: id } // Assuming user_id is handled by Supabase
    ]);
  
    if (data) {
      setComments([...comments, data]);
      setNewComment('');
    }
    setTrigger (prev => !prev);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .update({ title: editedTitle, content: editedContent, image_url:editedImageUrl })
      .match({ id });
      
  
    setIsEditMode(false);
    navigate('/');
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .match({ id });
      navigate('/');  
    if (!error) {
      navigate('/');  
    }
    // Handle errors
  };

  if (isEditMode) {
    return (
      <form className = "editForm" onSubmit={handleEditSubmit}>
        <input type="text" className = "formInput" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} placeholder='Edit Title' />
        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} placeholder='Edit Description' />
        <textarea className = "imageEdit" value={editedImageUrl} onChange={(e) => setEditedImageUrl(e.target.value)} placeholder='Edit Image URL'/>
        <button className = "edit" type="submit">Save Changes</button>
        <button onClick={() => setIsEditMode(false)} className = "cancel">Cancel</button>
      </form>
    );
  }

  
 
  return (
    <div>
      {post && (
        <div>
            <div className = "contents">
            <h1>{post.title}</h1> <br/>
            <p> Description: {post.content}</p> <br/>
            <img src={post.image_url} alt={post.title} />
          </div>
          
          <div className = "buttons">
            <button onClick={handleUpvote}>Upvote ({post.upvotes})</button>
            <div className = "actions">
             <button onClick={handleEdit}>Edit Post</button>
            <button onClick={handleDelete}>Delete Post</button>
            </div>
          </div>

            <div className = "entireComments">
          <form onSubmit={handleCommentSubmit}>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment"></textarea>
            <button type="submit">Submit Comment</button> <br/> <br/>
        </form>
        <h3>Comments: </h3> <br/>
          <div className="comments"> 
            {comments.map(comment => ( 
                <div key = {comment.id}>
                  <p><b>Comment: </b>{comment.content}</p>
                  </div>    
            ))}
          
        </div>
        </div>
       
        </div>
      )}
    </div>
  );
};

export default PostPage;
