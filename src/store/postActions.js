import { postActions } from "./postSlice";

export const fetchData = () => {
    return async (dispatch) => {
      const fetchPostData = async () => {
        const res = await fetch(`https://post-db-90e31-default-rtdb.firebaseio.com/posts.json`);
        if (!res.ok) {
          throw new Error("Data fetching failed");
        }
        const data = await res.json();
        return data; 
      };
      try{
          let fetchedData = await fetchPostData(); 
          dispatch(postActions.replacePosts(fetchedData)); 
          console.log("postActions Called");
      }catch{
  
      }
    };
  };
  


export const updateData = (data) => {

  return async (dispatch) => {
    {console.log("Update Actions called")}
    const updatePostData = async () => {
      const res = await fetch(
        `https://post-db-90e31-default-rtdb.firebaseio.com/posts.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Sending Posts to Servers failed!");
      }
    };
    try {
      updatePostData();
    } catch (err) {
      alert(err);
    }
  };
};

