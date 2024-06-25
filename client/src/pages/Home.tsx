import { useState, useEffect } from "react";
import Header from "../components/Header";
import PostList from "../components/PostList";

interface Post {
  id: number;
  title: string;
  content: string;
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1>Blog Posts</h1>
        <PostList posts={posts} />
      </div>
    </>
  );
}

export default HomePage;
