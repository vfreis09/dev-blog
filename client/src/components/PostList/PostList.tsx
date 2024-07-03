import React from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
