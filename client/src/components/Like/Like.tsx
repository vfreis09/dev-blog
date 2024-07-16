import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUser } from "../../context/UserContext";

interface LikesProps {
  itemId: number | undefined;
  type: "post" | "comment";
}

const fetchLikes = async (type: string, itemId: number) => {
  const response = await fetch(
    `http://localhost:3000/api/likes/${type}/${itemId}`
  );
  if (!response.ok) {
    throw new Error("Error fetching likes");
  }
  return response.json();
};

const Likes: React.FC<LikesProps> = ({ itemId, type }) => {
  const { userId } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: likesData,
    isLoading,
    error,
  } = useQuery(["likes", type, itemId], () => fetchLikes(type, itemId!), {
    enabled: !!itemId,
  });

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (likesData) {
      setHasLiked(
        likesData.some(
          (like: { author_id: number }) => like.author_id === userId
        )
      );
    }
  }, [likesData, userId]);

  const likeMutation = useMutation(
    () =>
      fetch(`http://localhost:3000/api/likes/${type}/${itemId}`, {
        method: hasLiked ? "DELETE" : "POST",
        credentials: "include",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", type, itemId]);
        setHasLiked(!hasLiked);
      },
      onError: (error) => {
        console.error("Error updating like:", error);
      },
    }
  );

  const handleLike = async () => {
    if (!userId) {
      alert("You need to be logged in to like a post");
      navigate("/login");
      return;
    }
    likeMutation.mutate();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading likes</p>;

  const likesCount = likesData ? likesData.length : 0;

  return (
    <div>
      <Button variant={hasLiked ? "danger" : "primary"} onClick={handleLike}>
        {hasLiked ? "Unlike" : "Like"}
      </Button>
      <p className="m-2">{likesCount} like(s)</p>
    </div>
  );
};

export default Likes;
