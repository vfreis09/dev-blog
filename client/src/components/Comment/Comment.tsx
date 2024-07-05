import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

interface CommentProps {
  postId: number | undefined;
}

interface Comment {
  id: number;
  content: string;
  author_id: number;
  author_name: string;
}

const Comments: React.FC<CommentProps> = ({ postId }) => {
  const { userId, isLoggedIn } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

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

  const handleDeleteComment = async (commentId: number) => {
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
      {isLoggedIn ? (
        <Card className="m-5">
          <Card.Body>
            <Form.Group controlId="commentTextarea">
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleComment}>
              Submit
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div
          onClick={() => navigate("/login")}
          style={{ color: "grey", cursor: "pointer" }}
          className="m-5"
        >
          Log in to write a comment
        </div>
      )}
      <div className="m-5">
        {comments.map((comment) => (
          <Card key={comment.id} className="mb-3">
            <Card.Body>
              <Card.Text>
                <strong>{comment.author_name}</strong>
              </Card.Text>
              <Card.Text>{comment.content}</Card.Text>
              {comment.author_id === userId && (
                <Button
                  variant="danger"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="m-2"
                >
                  Delete
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Comments;
