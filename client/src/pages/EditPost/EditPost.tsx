import Header from "../../components/Header/Header";
import PostForm from "../../components/PostForm/PostForm";
import Footer from "../../components/Footer/Footer";

function EditPost() {
  return (
    <>
      <Header />
      <PostForm isEditing={true} />
      <Footer />
    </>
  );
}

export default EditPost;
