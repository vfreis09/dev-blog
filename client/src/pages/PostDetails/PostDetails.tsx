import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import Comments from "../../components/Comment/Comment";

function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  const postId = parseInt(id ?? "");

  useEffect(() => {
    if (!isNaN(postId)) {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/posts/${postId}`
          );
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    } else {
      console.error("Invalid postId:", postId);
    }
  }, [postId]);

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
      <Comments postId={postId} />
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default PostDetails;
