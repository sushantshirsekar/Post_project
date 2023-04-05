import React from "react";
import "./home.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const posts = useSelector((state) => state.post.posts);
  const viewPostHandler =(data) => {
    localStorage.setItem("post", JSON.stringify(data));
    nav(`/postDetails`)
  }
  return (
    <>
      <h1 style={{ textAlign: "center", margin:"20px" }}>Posts</h1>

      <div className="homeContainer">
        {posts.map((post) => {
          return (
            <div className="card">
              <h3>Title: {post.title}</h3>
              <p>Created By: <b>{post.by} </b></p>
              <p>{post.description.substring(0, 70)}...</p>
              <div>
                    <button className="viewButton" onClick={()=> viewPostHandler(post)}>View Post</button>
                </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
