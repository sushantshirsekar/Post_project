import React from "react";
import "./createpost.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { postActions } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();
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
    nav("/history");
  };
  return (
    <>
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
    </>
  );
};

export default CreatePost;
