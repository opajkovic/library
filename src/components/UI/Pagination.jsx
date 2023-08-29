import "./Pagination.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Pagination = (props) => {
  const [data, setData] = useState(props.items); 
  const itemsPerPage = 5;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Pagination;
