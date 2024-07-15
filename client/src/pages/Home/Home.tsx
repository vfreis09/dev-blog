import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import PostList from "../../components/PostList/PostList";

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_picture: string;
  created_at: string;
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
        <PostList posts={posts} />
      </div>
    </>
  );
}

export default HomePage;
