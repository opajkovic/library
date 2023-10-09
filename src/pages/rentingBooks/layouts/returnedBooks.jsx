import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import BottomContainer from "../components/BottomContainer";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import "../rentingBooks.css";

const headers = [
  {
    headerName: "Naziv knjige",
    sort: false,
    dropdown: false,
    dataKey: "knjiga.title",
    path: "/books/:id",
    pathId: "knjiga",
  },
  {
    headerName: "Izdato učeniku",
    sort: false,
    dropdown: false,
    dataKey: "student.name+student.surname",
    path: "/students/:id",
    pathId: "student",
  },
  {
    headerName: "Datum izdavanja",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Datum vraćanja",
    sort: false,
    dropdown: false,
    dataKey: "return_date",
  },
  {
    headerName: "Zadržavanje knjige",
    sort: false,
    dropdown: false,
    dataKey: "",
  },
  {
    headerName: "Trenutno zadržavanje knjige",
    sort: false,
    dropdown: true,
    dataKey: "",
  },
];

export default function ReturnedBooks() {
  const dispatch = useDispatch();

  const [returnedBooks, setReturnedBooks] = useState([]);
  const [searchReturns, setSearchReturns] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const returnedData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(fetchedData.vracene));
    setReturnedBooks(fetchedData.vracene);
    setSearchReturns(fetchedData.vracene);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setReturnedBooks(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (returnedData !== null) {
        setReturnedBooks(returnedData);
      }
    }
  }, [search, returnedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReturns, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReturns, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const returnsToDisplay = returnedBooks.slice(startIndex, endIndex);
  const pageCount = Math.ceil(returnedBooks.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        searchColumn={handleColumnSearch}
        searchGlobal={handleGlobalSearch}
        itemsPerPageHandler={itemPerPageHandler}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        tableData={returnsToDisplay}
        title="Nova knjiga"
        headers={headers}
      />
    </div>
  );
}
