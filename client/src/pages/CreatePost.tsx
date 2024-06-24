import React from "react";
import PostForm from "../components/PostForm";

function CreatePost() {
  return (
    <>
      <h1>Create a New Post</h1>
      <PostForm isEditing={false} />
    </>
  );
}

export default CreatePost;
