import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createdpost.css";
import { useNavigate } from "react-router-dom";
import { postActions } from "../../store/postSlice";

const CreatedPost = () => {
  const nav = useNavigate();
  const [editStatus, updateStatus] = useState(
    localStorage.getItem("edit") ||  false
  );
  const [title , setTitle] = useState(localStorage.getItem("title") || "");
  let [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  ); 
  const mail = localStorage.getItem("email");
  const posts = useSelector((state) => state.post.posts) || [];
  const filteredPosts = posts.filter((post) => post.by === mail) || [];
  const dispatch = useDispatch(); 
  const deleteHandler = (data) => {
    dispatch(postActions.deletePost(data));
  }
  const titleRef = useRef(); 
  const descriptionRef = useRef(); 
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
    const mail = localStorage.getItem("email");
    const data = {
      id: Date.now(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      by: mail,
    };
    dispatch(postActions.addPost(data));
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    alert("Post added Successfully!");
    updateStatus(false); 
    localStorage.setItem("edit", false);
  };

  const editHandler = (data) => {
    updateStatus(true); 
    localStorage.setItem("edit", true); 
    dispatch(postActions.deletePost(data)); 
    setTitle(data.title); 
    setDescription(data.description); 
    localStorage.setItem("title", data.title); 
    localStorage.setItem("description", data.description); 
  }
  const viewPostHandler = (data)=> {
    localStorage.setItem("post", JSON.stringify(data));
    nav(`/postDetails`)
  }
  return (
    <>
    {editStatus === true && (
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
                placeholder="Enter Blog-Title"
                defaultValue={title || ""}
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
            <div className="blogbutton">
              <button type="submit" className="blogAdder">
                Add Blog
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="tableContainer">
        <h1 className="headerHistory">Posts Created By You</h1>
        <table className="tableData">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit/Delete</th>
          </tr>
          {filteredPosts.map((post) => {
            return (
              <tr className="tableRow">
                <td className="tableColumn">{post.title}</td>
                <td className="tableColumn">
                  {post.description.substring(0, 70)}...
                  <div>
                    <button className="viewButton" onClick={() => {viewPostHandler(post)}}>
                      View Post
                    </button>
                  </div>
                </td>
                <td>
                  <button className="deleteBtnHistory" onClick={()=> deleteHandler(post)}>Delete</button> <br />
                  <button className="editBtnHistory" onClick={()=> editHandler(post)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default CreatedPost;
