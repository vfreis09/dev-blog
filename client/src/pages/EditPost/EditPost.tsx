import Header from "../../components/Header/Header";
import PostForm from "../../components/PostForm/PostForm";

function EditPost() {
  return (
    <>
      <Header />
      <PostForm isEditing={true} />
    </>
  );
}

export default EditPost;
