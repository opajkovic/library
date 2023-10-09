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
    headerName: "Prekoračenje u danima",
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

export default function InExcessBooks() {
  const dispatch = useDispatch();

  const [inExcessBooks, setInExcessBooks] = useState([]);
  const [searchInExcess, setSearchInExcess] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const inExcessData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(fetchedData.prekoracene));
    setInExcessBooks(fetchedData.prekoracene);
    setSearchInExcess(fetchedData.prekoracene);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setInExcessBooks(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (inExcessData !== null) {
        setInExcessBooks(inExcessData);
      }
    }
  }, [search, inExcessData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchInExcess, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchInExcess, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const inExcessToDisplay = inExcessBooks.slice(startIndex, endIndex);
  const pageCount = Math.ceil(inExcessBooks.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        searchColumn={handleColumnSearch}
        searchGlobal={handleGlobalSearch}
        itemsPerPageHandler={itemPerPageHandler}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        tableData={inExcessToDisplay}
        title="Nova knjiga"
        headers={headers}
      />
    </div>
  );
}
