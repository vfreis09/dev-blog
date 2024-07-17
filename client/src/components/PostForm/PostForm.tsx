import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "react-query";

interface PostFormProps {
  isEditing: boolean;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const fetchPost = async (postId: number): Promise<Post> => {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PostForm: React.FC<PostFormProps> = ({ isEditing }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postId = parseInt(id ?? "");

  const {
    data: post,
    error,
    isLoading,
  } = useQuery<Post, Error>(["post", postId], () => fetchPost(postId), {
    enabled: isEditing && !isNaN(postId),
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const mutation = useMutation(
    (newPost: Post) =>
      fetch(`http://localhost:3000/api/posts/${isEditing ? `${postId}` : ""}`, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newPost),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        navigate("/");
      },
      onError: (error) => {
        console.error("Error submitting post:", error);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content };
    mutation.mutate(postData as any);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching post: {error.message}</p>;
  }

  return (
    <Container className="min-vh-100 pt-4 mt-4">
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
