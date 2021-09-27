import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { Paging } from "../../interfaces";

const PaginationBar: React.FC<Paging> = ({
  currentPage,
  pageLimit,
  totalData,
  nextPage, 
  previousPage
}) => {
  const renderPaginate = () => {
    const item = [];
    const totalPages = Math.ceil(totalData / pageLimit);
    for (let i = 1; i <= totalPages; i++) {
      item.push(
        <Pagination.Item active={currentPage === i} key={i}>
          {i}
        </Pagination.Item>
      );
    }
    return item;
  };
  return <Pagination>{renderPaginate()}</Pagination>;
};

export default PaginationBar;
