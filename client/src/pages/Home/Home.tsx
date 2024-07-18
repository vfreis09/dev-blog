import { useQuery } from "react-query";
import { useState } from "react";
import { Pagination, Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import PostList from "../../components/PostList/PostList";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_picture: string;
  created_at: string;
}

const fetchPosts = async (
  page: number,
  limit: number
): Promise<{
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}> => {
  const response = await fetch(
    `http://localhost:3000/api/posts?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const { data, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage, postsPerPage),
    {
      keepPreviousData: true,
    }
  );

  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching posts</div>;
  }

  return (
    <>
      <Header />
      <div className="min-vh-100">
        <PostList posts={posts} />
      </div>
      <Container className={styles.paginationContainer}>
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
