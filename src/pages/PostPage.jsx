// src/pages/PostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabaseClient';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();
  const [trigger, setTrigger] = useState(false);
  const [triggerUpvotes, setTriggerUpvotes] = useState(false);

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
  
 
  return (
    <div>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <img src={post.image} alt={post.title} />
          
          <button onClick={handleUpvote}>Upvote ({post.upvotes})</button>
          <div> 
            {comments.map(comment => ( 
                <div key = {comment.id}>
                  <p>{comment.content}</p>
                  </div>

            ))}
          
        </div>
        <form onSubmit={handleCommentSubmit}>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment"></textarea>
            <button type="submit">Submit Comment</button>
        </form>
        </div>
      )}
    </div>
  );
};

export default PostPage;
