import Link from "next/link";
import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { Paging } from "../../interfaces";

const PaginationBar: React.FC<Paging> = ({
  currentPage,
  pageLimit,
  totalData,
  nextPage, 
  previousPage,
  role
}) => {
  const renderPaginate = () => {
    const item = [];
    const totalPages = Math.ceil(totalData / pageLimit);
    for (let i = 1; i <= totalPages; i++) {
      item.push(
        <Link href={`/dashboard?role${role}/${currentPage}`}>
          <Pagination.Item active={currentPage === i} key={i}>
            {i}
          </Pagination.Item>
        </Link>
      );
    }
    return item;
  };
  return <Pagination>{renderPaginate()}</Pagination>;
};

export default PaginationBar;
