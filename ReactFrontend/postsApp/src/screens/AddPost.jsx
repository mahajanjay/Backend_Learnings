import React from "react";
import PostForm from "../components/PostForm";
import './AddPost.css'

function AddPost() {
  return (
    <div className="addPost_container">
      <div className="addPost_content">
        <h1>Write new post</h1>
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;
