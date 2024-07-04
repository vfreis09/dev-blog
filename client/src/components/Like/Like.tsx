import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

interface LikesProps {
  postId: number | undefined;
}

const Likes: React.FC<LikesProps> = ({ postId }) => {
  const { userId } = useUser();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(`http://localhost:3000/api/likes/${postId}`);
      const data = await response.json();
      setLikes(data.length);
      setHasLiked(
        data.some((like: { author_id: number }) => like.author_id === userId)
      );
    };

    fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!userId) {
      alert("You need to be logged in to like a post");
      navigate("/login");
      return;
    }
    if (hasLiked) {
      await fetch(`http://localhost:3000/api/likes/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setLikes(likes - 1);
    } else {
      await fetch(`http://localhost:3000/api/likes/${postId}`, {
        method: "POST",
        credentials: "include",
      });
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  return (
    <div className="m-5">
      <Button variant={hasLiked ? "danger" : "primary"} onClick={handleLike}>
        {hasLiked ? "Unlike" : "Like"}
      </Button>
      <p>{likes} likes</p>
    </div>
  );
};

export default Likes;
