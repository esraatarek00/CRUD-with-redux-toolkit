import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../network/postsApis.js"; 
import "./style.css";

const PostDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  const post = posts.find((post) => post.id === Number(id)); 

  useEffect(() => {
    if (!posts.length) {
      setLoading(true);
      dispatch(fetchPosts())
        .then(() => setLoading(false))
        .catch((err) => {
          setError("Failed to load posts. Please try again.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [posts, dispatch]);

 
  if (loading) {
    return <p>Loading post details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post with ID {id} not found</p>; 
  }

  return (
    
    <div className="post-details">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>
              <strong>Post ID:</strong> {post.id}
            </p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default PostDetails;
