import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import ProfileEvidence from "../components/ProfileEvidence";
import api from "../../../api/apiCalls";
import { auth } from "../../../services/AuthService";
import { userInfoLoader } from "../../../util/UserInfo";

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
    dataKey: "borrow_date",
  },
  {
    headerName: "Rezervacija ističe",
    sort: false,
    dropdown: false,
    dataKey: "return_date",
  },
  {
    headerName: "Rezervaciju podnio",
    sort: false,
    dropdown: false,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
  { headerName: "Status", sort: false, dropdown: true, dataKey: "status" },
];

export default function ProfileEvidenceReserved() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [reserveData, setReserveData] = useState([]);
  const [searchReserve, setSearchReserve] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const loaderData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const reservedData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(loaderData));
    setSearchReserve(loaderData);
    setReserveData(loaderData);
    userInfoLoader(id, setUserInfo, navigate);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setReserveData(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (reservedData !== null) {
        setReserveData(reservedData);
      }
    }
  }, [search, reservedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReserve, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReserve, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const reservedToDisplay = reserveData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(reserveData.length / itemsPerPage);

  return (
    <ProfileEvidence
      searchColumn={handleColumnSearch}
      searchGlobal={handleGlobalSearch}
      itemsPerPageHandler={itemPerPageHandler}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      tableData={reservedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestActive = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      return responseData.active.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
