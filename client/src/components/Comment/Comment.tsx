import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Image, Row, Col } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "../../context/UserContext";
import Likes from "../../components/Like/Like";

interface CommentProps {
  postId?: number;
}

interface Comment {
  id: number;
  content: string;
  author_id: number;
  author_name: string;
  author_picture: string;
  created_at: string;
}

const fetchComments = async (postId: number) => {
  const response = await fetch(`http://localhost:3000/api/comments/${postId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching comments");
  }
  return response.json();
};

const Comments: React.FC<CommentProps> = ({ postId }) => {
  const { userId, isLoggedIn } = useUser();
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery<Comment[]>(
    ["comments", postId],
    () => fetchComments(postId || 0),
    {
      enabled: !!postId,
    }
  );

  const addCommentMutation = useMutation<void, Error, { content: string }>(
    async ({ content }) => {
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
      queryClient.invalidateQueries(["comments", postId || 0]);
    }
  );

  const deleteCommentMutation = useMutation<void, Error, number>(
    async (commentId) => {
      const response = await fetch(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      queryClient.invalidateQueries(["comments", postId || 0]);
    }
  );

  const handleComment = () => {
    addCommentMutation.mutate({ content });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
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
        {isLoading ? (
          <div>Loading comments...</div>
        ) : isError ? (
          <div>Error fetching comments</div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="mb-3">
              <Card.Body>
                <Card.Text>
                  <Image
                    src={comment.author_picture}
                    roundedCircle
                    height="24"
                    width="24"
                    alt="User Avatar"
                    className="userImage"
                  />
                  {`${comment.author_name} \u2022 ${formatDistanceToNow(
                    new Date(comment.created_at),
                    {
                      addSuffix: true,
                    }
                  )}`}
                </Card.Text>
                <Card.Text>{comment.content}</Card.Text>
                <Row className="align-items-center">
                  <Col>
                    <Likes itemId={comment.id} type="comment" />
                  </Col>
                  <Col>
                    {comment.author_id === userId && (
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
