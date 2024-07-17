import PostForm from "../../components/PostForm/PostForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function CreatePost() {
  return (
    <>
      <Header />
      <PostForm isEditing={false} />
      <Footer />
    </>
  );
}

export default CreatePost;
