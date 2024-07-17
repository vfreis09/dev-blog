import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Post from "../../components/Post/Post";
import Likes from "../../components/Like/Like";
import Header from "../../components/Header/Header";
import Comments from "../../components/Comment/Comment";
import Footer from "../../components/Footer/Footer";

const fetchPost = async (postId: number): Promise<Post> => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error deleting post");
  }
};

function PostDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? "");
  const queryClient = useQueryClient();

  if (isNaN(postId)) {
    console.error("Invalid postId:", postId);
    return <p>Invalid post ID</p>;
  }

  const {
    data: post,
    error,
    isLoading,
  } = useQuery<Post, Error>(["post", postId], () => fetchPost(postId));

  const mutation = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching post: {error.message}</p>;
  }

  return post ? (
    <>
      <Header />
      <div className="min-vh-100">
        <Post post={post} onDelete={handleDelete} />
        <div className="m-5">
          <Likes itemId={postId} type="post" />
        </div>
        <Comments postId={postId} />
      </div>
      <Footer />
    </>
  ) : (
    <p>No post found</p>
  );
}

export default PostDetails;
