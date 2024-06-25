import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Header from "../components/Header";

function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async (postId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return post ? (
    <>
      <Header />
      <Post post={post} onDelete={handleDelete} />
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default PostDetails;
