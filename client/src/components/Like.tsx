import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

interface LikesProps {
  postId: string | undefined;
}

const Likes: React.FC<LikesProps> = ({ postId }) => {
  const { userId } = useUser();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(`http://localhost:3000/api/likes/${postId}`);
      const data = await response.json();
      setLikes(data.length);
      setHasLiked(
        data.some((like: { author_id: string }) => like.author_id === userId)
      );
    };

    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
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
    <div>
      <button onClick={handleLike}>{hasLiked ? "Unlike" : "Like"}</button>
      <p>{likes} likes</p>
    </div>
  );
};

export default Likes;
