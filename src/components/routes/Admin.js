import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createdpost.css";
import { postActions } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  let [title, setTitle] = useState(localStorage.getItem("title") || "");
  let [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );
  let [by, setBy] = useState(localStorage.getItem("by") || "");

  const titleRef = useRef();
  const descriptionRef = useRef();
  const emailRef = useRef(); 
  const [addPost, setAddPost] = useState(JSON.parse(localStorage.getItem("add")) || false);
  const [editStatus, updateStatus] = useState(
    JSON.parse(localStorage.getItem("edit")) || false
  );
  const nav = useNavigate();

  const addBlogHandler = (e) => {
    e.preventDefault();
    if (titleRef.current.value === "" || descriptionRef.current.value === "") {
      alert("Please enter all details about blog");
      return;
    }
    if (titleRef.current.value.length <= 4) {
      alert("Title should be greater than 4");
      return;
    }
    if (descriptionRef.current.value.length < 151) {
      alert("Description of blog should be greater than 150");
      return;
    }
    const data = {
      id: Date.now(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      by: emailRef.current.value,
    };
    dispatch(postActions.addPost(data));
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    localStorage.setItem("add", true);
    setTitle("");
    localStorage.setItem("title", "");
    setDescription("");
    localStorage.setItem("description", "");
    setBy(""); 
    localStorage.setItem("by", ""); 
    alert("Post added Successfully!");
  };

  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const deleteHandler = (data) => {
    dispatch(postActions.deletePost(data));
  };

  const addHandler = () => {
    setAddPost(true);
    localStorage.setItem("add", true);
    setTitle("");
    localStorage.setItem("title", "");
    setDescription("");
    setBy(""); 
    localStorage.setItem("by", ""); 
    localStorage.setItem("description", "");

    updateStatus(false);
    localStorage.setItem("edit", false);
  };

  const editHandler = (data) => {
    updateStatus(true);
    localStorage.getItem("edit", true);
    setTitle(data.title);
    localStorage.setItem("title", data.title);
    setDescription(data.description);
    localStorage.setItem("description", data.description);
    setBy(data.by); 
    localStorage.setItem("by", data.by); 
    dispatch(postActions.deletePost(data)); 
  };
  const hideHandler = () => {
    updateStatus(false);
    localStorage.setItem("edit", false);
  };

  const hideAddHandler = () => {
    setAddPost(false);
    localStorage.setItem("add", false);
  };

  const logoutAdmin = () => {
    dispatch(postActions.adminLogOut());
    setAddPost(false);
    localStorage.setItem("add", false);
    updateStatus(false);
    localStorage.setItem("edit", false);
    setTitle("");
    localStorage.removeItem("title");
    setDescription("");
    localStorage.removeItem("description");
    setBy(""); 
    localStorage.removeItem("by"); 
    nav("/");
  }

  const viewPostHandler = (data) => {
    localStorage.setItem("post", JSON.stringify(data));
    nav(`/postDetails`)
  }
  return (
    <>
    {console.log(addPost || editStatus)}
      {(addPost || editStatus) && (
        <div className="container">
          <form className="formContainer" onSubmit={addBlogHandler}>
            <h1 className="header">Create Blog</h1>
            <div className="form-data">
              <label htmlFor="title" className="form-label">
                Title
              </label>{" "}
              <br />
              <input
                id="title"
                className="inputs"
                defaultValue={title || ""}
                placeholder="Enter Blog-Title"
                type="text"
                ref={titleRef}
              />
            </div>
            <div className="form-data">
              <label htmlFor="description" className="form-label">
                Description
              </label>{" "}
              <br />
              <input
                id="description"
                className="inputs"
                placeholder="Enter Blog-Description"
                defaultValue={description || ""}
                type="text"
                ref={descriptionRef}
              />
            </div>
            <div className="form-data">
              <label htmlFor="email" className="form-label">
                Created By
              </label>{" "}
              <br />
              <input
                id="email"
                className="inputs"
                defaultValue={by || ""}
                placeholder="Enter Created By"
                type="email"
                ref={emailRef}
              />
            </div>
            <div className="blogbutton">
              <button type="submit" className="blogAdder">
                {editStatus ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
      {editStatus===true && (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <button className="editButton" onClick={hideHandler}>
            Hide Edit
          </button>
        </div>
      )}
      <div className="tableContainer">
        <h1 className="headerHistory">Admin</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <button className="addButton" onClick={logoutAdmin}>Log Out</button>
          </div>
          {editStatus===false && (
            <div style={{ display: "flex", justifyContent: "center", marginLeft:"10px" }}>
              <button
                className="addButton"
                onClick={addPost ? hideAddHandler : addHandler}
              >
                {addPost ? "Hide": "Show"}
              </button>
            </div>
          )}
        </div>
        <table className="tableData">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit/Delete</th>
          </tr>
          {posts.map((post) => {
            return (
              <tr className="tableRow">
                <td className="tableColumn">{post.title}</td>
                <td className="tableColumn">
                  {post.description.substring(0, 70)}
                  <div>
                    <button className="viewButton" onClick={() => {viewPostHandler(post)}}>
                      View Post
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="deleteBtnHistory"
                    onClick={() => deleteHandler(post)}
                  >
                    Delete
                  </button>{" "}
                  <br />
                  <button
                    className="editBtnHistory"
                    onClick={() => editHandler(post)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Admin;
