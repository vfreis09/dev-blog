import PostForm from "../components/PostForm";
import Header from "../components/Header";

function CreatePost() {
  return (
    <>
      <Header />
      <h1>Create a New Post</h1>
      <PostForm isEditing={false} />
    </>
  );
}

export default CreatePost;
