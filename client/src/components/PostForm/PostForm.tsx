import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

interface PostFormProps {
  isEditing: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ isEditing }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postId = parseInt(id ?? "");

  useEffect(() => {
    if (isEditing && !isNaN(postId)) {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/posts/${postId}`
          );
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [postId, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content };
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${isEditing ? `${postId}` : ""}`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(postData),
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error submitting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">
            {isEditing ? "Edit Post" : "Create Post"}
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
              />
            </Form.Group>
            <div className="text-center mt-4">
              <Button variant="primary" type="submit">
                {isEditing ? "Update" : "Create"} Post
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostForm;
