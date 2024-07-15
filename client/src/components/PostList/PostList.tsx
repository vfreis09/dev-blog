import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";
import "./PostList.css";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Container className="pt-5">
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <h1 className="display-4 text-center">Blog Posts</h1>
          <ListGroup className="post-list">
            {posts.map((post) => (
              <ListGroup.Item
                key={post.id}
                as="div"
                className="mb-3 border-0 p-0"
              >
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/post/${post.id}`} className="post-title-link">
                        {post.title}
                      </Link>
                    </Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PostList;
