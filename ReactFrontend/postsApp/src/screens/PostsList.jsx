import React, { useEffect, useState } from "react";
import axios from "axios";
import postsArray from "../data.json";
import "./PostList.css";
import { useNavigate } from "react-router-dom";

function PostsList() {

  const navigate = useNavigate();

  const [posts, setPost] = useState([]);

  const getPosts = async () => {
    await axios
      .get("http://localhost:3000/api/v1/posts")
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  };

  const deletePost = (post) => {
    axios
      .delete(`http://localhost:3000/api/v1/posts/${post._id}`)
      .then((res) => getPosts());
  };

  const editPost = (post) => {

    navigate(`/addPost?id=${post._id}&userId=${post.userId}&title=${post.title}&body=${post.body}`);
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (posts.length !== 0) {
    return (
      <div className="postList">
        {posts.map((post, index) => {
          return (
            <div
              key={index}
              className="card"
              style={{ width: "18rem", border: "1px solid blue" }}
            >
              <div className="card-body">
                <p>{post.userId}</p>
                <h3 className="card-title"> {post.title} </h3>
                <p className="card-text">{post.body}</p>
              </div>
              <button
                className="btn deleteBtn"
                onClick={() => deletePost(post)}
              >
                Delete
              </button>
              <button
                className="btn editBtn ml"
                onClick={() => editPost(post)}
              >
                Edit
              </button>
              
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>List is unavailable!</h1>;
  }
}

export default PostsList;
