import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("login")) || false,
    posts: [],
    isAdmin: JSON.parse(localStorage.getItem("isAdmin") || false),
  },
  reducers: {
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("login", true);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("login", false);
    },
    replacePosts(state, action) {
      console.log(action.payload);
      state.posts = action.payload || [];
      state.isLoggedIn = JSON.parse(localStorage.getItem("login"));
    },
    deletePost(state, action) {
      const data = action.payload;
      state.posts = state.posts.filter((post) => post.id !== data.id);
    },
    adminLogin(state){
        state.isAdmin = true; 
        localStorage.setItem("isAdmin", true); 
    }, 
    adminLogOut(state){
        state.isAdmin = false; 
        localStorage.setItem("isAdmin", false); 
    }, 
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
