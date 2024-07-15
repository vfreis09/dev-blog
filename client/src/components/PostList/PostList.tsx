import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import Likes from "../../components/Like/Like";
import "./PostList.css";

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_picture: string;
  created_at: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Container className="pt-5">
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <ListGroup className="post-list">
            {posts.map((post) => (
              <ListGroup.Item key={post.id} className="mb-3 border-0 p-0">
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Image
                        src={post.author_picture}
                        roundedCircle
                        height="24"
                        width="24"
                        alt="User Avatar"
                        className="userImage"
                      />
                      {`${post.author_name} \u2022 ${formatDistanceToNow(
                        new Date(post.created_at),
                        { addSuffix: true }
                      )}`}
                    </Card.Subtitle>
                    <Card.Title>
                      <Link to={`/post/${post.id}`} className="post-title-link">
                        {post.title}
                      </Link>
                    </Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <Likes postId={post.id} />
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
