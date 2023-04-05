import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const post = JSON.parse(localStorage.getItem("post"));
  console.log(post);
  const admin = useSelector((state) => state.post.isAdmin);
  const user = useSelector((state) => state.post.isLoggedIn);
  const nav = useNavigate();
  const backHandler = () => {
    if (admin) {
      nav("/admin");
      return;
    }
    nav("/")
  };
  const historyHandler = () => {
    nav("/history"); 
  }
  return (
    <>
      <div style={{ textAlign: "center", margin: "30px" }}>
        <div style={{display:"flex", justifyContent: "center"}}>
          {user && <div >
            {
              <button
                onClick={historyHandler}
                style={{
                  background: "skyblue",
                  padding: "5px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                History
              </button>
            }
          </div>}
          <div style={{marginLeft:"20px"}}>
            <button
              onClick={backHandler}
              style={{
                background: "skyblue",
                padding: "5px",
                border: "1px solid black",
                borderRadius: "10px",
                color: "black",
                cursor: "pointer",
              }}
            >
              {admin ? "Admin Panel" : "Home" }
            </button>
          </div>
        </div>
        <h2 style={{ padding: "20px" }}>{post.title}</h2>
        <div>
          <p style={{ padding: "20px" }}>
            Created By: <b>{post.by}</b>
          </p>
          <p>{post.description}</p>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
