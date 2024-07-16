import { useQuery } from "react-query";
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

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("http://localhost:3000/api/posts/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function HomePage() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[], Error>("posts", fetchPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div>
        <PostList posts={posts || []} />
      </div>
    </>
  );
}

export default HomePage;
