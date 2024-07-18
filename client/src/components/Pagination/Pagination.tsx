import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className={styles.paginationWrapper}>
      <BootstrapPagination>
        <BootstrapPagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => (
          <BootstrapPagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </BootstrapPagination.Item>
        ))}
        <BootstrapPagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
