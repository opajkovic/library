import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import ProfileEvidence from "../components/ProfileEvidence";
import { userInfoLoader } from "../../../util/UserInfo";
import { auth } from "../../../services/AuthService";
import { LoaderRented } from "../../rentingBooks/rentingBooks";

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
    dataKey: "status",
  },
];

export default function ProfileEvidenceReturned() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [returnData, setReturnData] = useState([]);
  const [searchReturn, setsearchReturn] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const loaderData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const returnedData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(loaderData));
    setsearchReturn(loaderData);
    setReturnData(loaderData);
    userInfoLoader(id, setUserInfo, navigate);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setReturnData(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (returnedData !== null) {
        setReturnData(returnedData);
      }
    }
  }, [search, returnedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReturn, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchReturn, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const returnedToDisplay = returnData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(returnData.length / itemsPerPage);

  return (
    <ProfileEvidence
      searchColumn={handleColumnSearch}
      searchGlobal={handleGlobalSearch}
      itemsPerPageHandler={itemPerPageHandler}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      tableData={returnedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export let loaderTestReturned = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      return responseData.vracene.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
