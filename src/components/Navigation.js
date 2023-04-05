import React from "react";
import "./navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../store/postSlice";

const Navigation = () => {
  const logInStatus = useSelector((state) => state.post.isLoggedIn);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const logoutHandler = () => {
    dispatch(postActions.logout());
    nav("/signup");
    localStorage.removeItem("email");
  };
  return (
    <nav>
      <div className="navClass">
        <ul className="first">
          <li className="links">
            <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
              Home
            </NavLink>{" "}
          </li>
          {logInStatus===false && (
            <li className="links">
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/signup"
              >
                SignUp
              </NavLink>{" "}
            </li>
          )}
          {console.log(logInStatus)}
          {logInStatus===true && (
            <li className="links">
              <NavLink style={{ textDecoration: "none", color: "white" }} to="/create">
                Create
              </NavLink>
            </li>
          )}
          {logInStatus===true && (
            <li className="links">
              <NavLink style={{ textDecoration: "none", color: "white" }} to="/history">
                History
              </NavLink>
            </li>
          )}
          <li className="links">
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
        <ul className="second">
          {logInStatus===true && (
            <li>
              <button className="logout" onClick={logoutHandler}>
                Log Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
