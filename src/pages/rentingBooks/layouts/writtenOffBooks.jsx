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
  { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey:'bibliotekar1.name+bibliotekar1.surname' },
  { headerName: "Datum otpisivanja", sort: false, dropdown: false, dataKey: 'action_date' },
  { headerName: "Zadržavanje knjige", sort: false, dropdown: false, dataKey: 'borrow_date' },
  { headerName: "Knjigu otpisao", sort: false, dropdown: true, dataKey:'bibliotekar1.name+bibliotekar1.surname'  },
];

export default function WrittenOffBooks() {
  const dispatch = useDispatch();

  const [writtenOffBooks, setWrittenOffBooks] = useState([]);
  const [searchWrittenOffs, setSearchWrittenOffs] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const writtenOffData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(fetchedData.otpisane));
    setWrittenOffBooks(fetchedData.otpisane);
    setSearchWrittenOffs(fetchedData.otpisane);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setWrittenOffBooks(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (writtenOffData !== null) {
        setWrittenOffBooks(writtenOffData);
      }
    }
  }, [search, writtenOffData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchWrittenOffs, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchWrittenOffs, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const writtenOffToDisplay = writtenOffBooks.slice(startIndex, endIndex);
  const pageCount = Math.ceil(writtenOffBooks.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        searchColumn={handleColumnSearch}
        searchGlobal={handleGlobalSearch}
        itemsPerPageHandler={itemPerPageHandler}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        tableData={writtenOffToDisplay}
        title="Nova knjiga"
        headers={headers}
      />
    </div>
  );
}
