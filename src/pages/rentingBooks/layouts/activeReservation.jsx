import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import PageTitle from "../../../components/pageTitle/PageTitle";
import BottomContainer from "../components/BottomContainer";
import api from "../../../api/apiCalls";
import { auth } from "../../../services/AuthService";
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
    headerName: "Rezervacija ističe",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date"
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

export default function ActiveReservations() {
  const dispatch = useDispatch();

  const [reservation, setReservation] = useState([]);
  const [searchReservation, setSearchReservation] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const reservationData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(fetchedData.active));
    setReservation(fetchedData.active);
    setSearchReservation(fetchedData.active);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setReservation(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (reservationData !== null) {
        setReservation(reservationData);
      }
    }
  }, [search, reservationData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReservation, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReservation, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reservationToDisplay = reservation.slice(startIndex, endIndex);
  const pageCount = Math.ceil(reservation.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        searchColumn={handleColumnSearch}
        searchGlobal={handleGlobalSearch}
        itemsPerPageHandler={itemPerPageHandler}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        tableData={reservationToDisplay}
        title="Nova knjiga"
        headers={headers}
      />
    </div>
  );
}

export async function LoaderReservations() {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
}
