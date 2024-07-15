import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useUser } from "../../context/UserContext";

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  created_at: string;
}

interface PostProps {
  post: Post;
  onDelete: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const { userId } = useUser();

  return (
    <Card className="m-5">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {`${post.author_name} • ${post.created_at}`}
        </Card.Subtitle>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        {post.author_id === userId && (
          <Row className="justify-content-end mt-3">
            <Col xs="auto">
              <Button
                variant="danger"
                onClick={() => onDelete(post.id)}
                className="mr-2"
              >
                Delete
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="primary">
                <Link
                  to={`/edit/${post.id}`}
                  className="text-white text-decoration-none"
                >
                  Edit
                </Link>
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default Post;
