import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PostFormProps {
  isEditing: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ isEditing }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${id}`);
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content };
    try {
      const response = await fetch(
        `http://localhost:3000/${isEditing ? `/${id}` : ""}`,
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">{isEditing ? "Update" : "Create"} Post</button>
    </form>
  );
};

export default PostForm;
