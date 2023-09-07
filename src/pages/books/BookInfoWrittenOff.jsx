import Table from "../../components/UI/Table";
import "./BookInfoWrittenOff.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData } from "react-router";
import { useState } from "react";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";

const headers = [
  { headerName: "Izdato učeniku", sort: true, dropdown: false },
  { headerName: "Datum izdavanja", sort: false, dropdown: false },
  { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false },
  { headerName: "Prekoračenje u danima", sort: false, dropdown: false },
  { headerName: "Knjigu izdao", sort: false, dropdown: true },
];

const BookInfoWrittenOff = () => {
  const fetchedData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const data = [];
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksToDisplay = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  return (
    <>
      <ProfileTitle
        userInfo={{ name: fetchedData.title }}
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        change={true}
        deleteMssg={true}
        booksSpecial={true}
        image={fetchedData.photo}
        editPath={`/books/${fetchedData.id}/edit`}
      />
      <div className="written-off-table-wrapper">
        <h1>Otpiši knjigu</h1>
        <TableControl
          title="Otpiši knjigu"
          hide={true}
          itemsPerPageHandler={itemPerPageHandler}
        />
        <Table headers={headers} tableData={booksToDisplay} />
        {data.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
      </div>
    </>
  );
};

export default BookInfoWrittenOff;
