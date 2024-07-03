import Header from "../../components/Header/Header";
import PostForm from "../../components/PostForm/PostForm";

function EditPost() {
  return (
    <>
      <Header />
      <h1>Edit your Post</h1>
      <PostForm isEditing={true} />
    </>
  );
}

export default EditPost;
