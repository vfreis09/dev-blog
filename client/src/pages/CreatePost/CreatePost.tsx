import PostForm from "../../components/PostForm/PostForm";
import Header from "../../components/Header/Header";

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
