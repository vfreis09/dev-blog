import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

interface CommentProps {
  postId: string | undefined;
}

interface Comment {
  id: string;
  content: string;
  author_id: string;
}

const Comments: React.FC<CommentProps> = ({ postId }) => {
  const { userId } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    if (!postId) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    if (!postId) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post comment");
      }
      setContent("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        ></textarea>
        <button onClick={handleComment}>Submit</button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            {comment.author_id === userId && (
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
