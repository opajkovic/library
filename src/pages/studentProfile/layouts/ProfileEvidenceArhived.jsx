import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import ProfileEvidence from "../components/ProfileEvidence";
import { userInfoLoader } from "../../../util/UserInfo";
import { auth } from "../../../services/AuthService";
import { reservationLoader } from "../../dashboard/Dashboard";

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
    headerName: "Rezervacija zatvorena",
    sort: false,
    dropdown: false,
    dataKey: "",
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

export default function ProfileEvidenceArchived() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [archiveData, setArchiveData] = useState([]);
  const [searchArchive, setSearchArchive] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const loaderData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const archivedData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(loaderData));
    setSearchArchive(loaderData);
    setArchiveData(loaderData);
    userInfoLoader(id, setUserInfo, navigate);
  }, []);

  useEffect(() => {
    if (search !== "") {
      setArchiveData(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (archivedData !== null) {
        setArchiveData(archivedData);
      }
    }
  }, [search, archivedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchArchive, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchArchive, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const archivedToDisplay = archiveData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(archiveData.length / itemsPerPage);

  return (
    <ProfileEvidence
      searchColumn={handleColumnSearch}
      searchGlobal={handleGlobalSearch}
      itemsPerPageHandler={itemPerPageHandler}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      tableData={archivedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestArchived = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await reservationLoader();
      return responseData.archive.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
