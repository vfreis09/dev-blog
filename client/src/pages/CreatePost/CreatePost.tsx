import PostForm from "../../components/PostForm/PostForm";
import Header from "../../components/Header/Header";

function CreatePost() {
  return (
    <>
      <Header />
      <PostForm isEditing={false} />
    </>
  );
}

export default CreatePost;
