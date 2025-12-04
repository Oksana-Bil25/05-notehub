import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={page - 1}
      previousLabel="<"
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      pageLinkClassName={styles.link}
      activeClassName={styles.active}
      previousClassName={styles.page}
      nextClassName={styles.page}
      breakClassName={styles.page}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
