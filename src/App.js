import React from "react";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/routes/SignUp";
import About from "./components/routes/About";
import CreatePost from "./components/routes/CreatePost";
import CreatedPost from "./components/routes/CreatedPost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateData } from "./store/postActions";
import Home from "./components/routes/Home";
import Admin from "./components/routes/Admin";
import PostDetail from "./components/routes/PostDetail";

let initState = true;
const App = () => {
  const dispatch = useDispatch();
  const userblogs = useSelector((state) => state.post.posts);
  console.log(userblogs);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (initState) {
      initState = false;
      return;
    }
    dispatch(updateData(userblogs));
  }, [dispatch, userblogs]);

  const loginStatus = useSelector((state) => state.post.isLoggedIn);
  const adminStatus = useSelector((state) => state.post.isAdmin);

  return (
    <>
      {console.log(loginStatus)}
      {!adminStatus && <Navigation />}
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          {<Route path="/about" element={<About />} />}
          {loginStatus === true && (
            <Route path="/create" element={<CreatePost />} />
          )}
          <Route path="/admin" element={<Admin />}/>
          {loginStatus === true && (
            <Route path="/history" element={<CreatedPost />} />
          )}
          <Route path="/postDetails" element={<PostDetail/>}/>
        </Routes>
    
    </>
  );
};

export default App;
