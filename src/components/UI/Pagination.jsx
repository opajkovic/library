import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({pageCount, onPageChange}) => {

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Pagination;
