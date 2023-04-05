import React from "react";
import "./signup.css";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { postActions } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [status, setStatus] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const cpasswordRef = useRef("");
  const nav = useNavigate();

  const dispatch = useDispatch();
  const changeStatus = () => {
    setStatus((prev) => !prev);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      cpasswordRef.current.value === ""
    ) {
      alert("Please enter all details");
      return;
    }
    if (passwordRef.current.value.length < 7) {
      alert("Please enter a password having length more than 6");
      return;
    }
    if (!status) {
      if (passwordRef.current.value !== cpasswordRef.current.value) {
        alert("Password and confirm password doesn't match");
        return;
      }
    }
    if(status){
      if(emailRef.current.value ==="admin@123.com" && passwordRef.current.value==="admin123"){
        dispatch(postActions.adminLogin()); 
        nav("/admin");
        return;
      }
    }
    let url;
    if (status) {
      //login
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJx433PMwEbhULmKL35pTrGD84PWVDSxE";
    } else if (!status) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJx433PMwEbhULmKL35pTrGD84PWVDSxE";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Login Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((d) => {
        console.log(d);
        console.log(d.email);
        if (status) {
          let str = "";
          
          console.log(str);
          localStorage.setItem("email", d.email);
          nav("/create");
          dispatch(postActions.login());
        } else {
          alert(
            "User resgistered successfully! Pleas log in with your details"
          );
        }
      })
      .catch((err) => alert(err));

      emailRef.current.value = ""; 
      passwordRef.current.value = ""; 
      if(!status){
        cpasswordRef.current.value = "";
      }
  };
  return (
    <>
      <div className="form-container">
        <form className="form-data" onSubmit={submitHandler}>
          <h1 className="form-header">{status ? "Login" : "SignUp"}</h1>
          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>{" "}
            <br />
            <input
              id="email"
              placeholder="Enter E-mail"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>{" "}
            <br />
            <input
              id="password"
              placeholder="Enter Password"
              type="password"
              ref={passwordRef}
            />
          </div>
          {!status && (
            <div className="form-inputs">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>{" "}
              <br />
              <input
                id="cpassword"
                placeholder="Confirm Password"
                type="text"
                ref={cpasswordRef}
              />
            </div>
          )}
          <p onClick={changeStatus} className="status-data">
            {status ? "Create Account" : "LogIn to existing accounts"}
          </p>
          <button type="submit" className="form-button">
            {status ? "LogIn" : "SignUp"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
