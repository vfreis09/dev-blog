import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: string;
}

interface PostProps {
  post: Post;
  onDelete: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const { userId } = useUser();

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/edit/${post.id}`}>Edit</Link>
      {post.author_id === userId && (
        <button onClick={() => onDelete(post.id)}>Delete</button>
      )}
    </div>
  );
};

export default Post;
