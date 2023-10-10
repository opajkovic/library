import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import PageTitle from "../../../components/pageTitle/PageTitle";
import BottomContainer from "../components/BottomContainer";
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
    headerName: "Datum rezervacije",
    sort: false,
    dropdown: false,
    dataKey: "action_date",
  },
  {
    headerName: "Rezervacija zatvorena",
    sort: false,
    dropdown: false,
    dataKey: "status",
  },
  {
    headerName: "Rezervaciju podnio",
    sort: false,
    dropdown: false,
    dataKey: "student.name+student.surname",
    path: "/students/:id",
    pathId: "student",
  },
  { headerName: "Status", sort: false, dropdown: true, dataKey: "status" },
];

export default function ArchivedarchivedBookss() {
  const dispatch = useDispatch();

  const [archivedBooks, setArchivedBooks] = useState([]);
  const [searchArchivedBooks, setSearchArchivedBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const archivedBooksData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(fetchedData.archive));
    setArchivedBooks(fetchedData.archive);
    setSearchArchivedBooks(fetchedData.archive);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setArchivedBooks(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (archivedBooksData !== null) {
        setArchivedBooks(archivedBooksData);
      }
    }
  }, [search, archivedBooksData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchArchivedBooks, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchArchivedBooks, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const archivedBooksToDisplay = archivedBooks.slice(startIndex, endIndex);
  const pageCount = Math.ceil(archivedBooks.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        searchColumn={handleColumnSearch}
        searchGlobal={handleGlobalSearch}
        itemsPerPageHandler={itemPerPageHandler}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        tableData={archivedBooksToDisplay}
        title="Nova knjiga"
        headers={headers}
      />
    </div>
  );
}
