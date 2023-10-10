import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../../../redux/renting-books";
import { filterSearchedData } from "../../../redux/actions";
import ProfileEvidence from "../components/ProfileEvidence";
import api from "../../../api/apiCalls";
import { auth } from "../../../services/AuthService";
import { LoaderRented } from "../../rentingBooks/rentingBooks";

const headers = [
  {
    headerName: "Naziv knjige",
    sort: false,
    dropdown: false,
    dataKey: "knjiga.title",
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
  { headerName: "Datum otpisivanja", sort: false, dropdown: false },
  { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
  {
    headerName: "Knjigu otpisao",
    sort: false,
    dropdown: true,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
];

export default function ProfileEvidenceWrittenOff() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [writtenOffData, setWrittenOffData] = useState([]);
  const [searchWrittenOff, setSearchWrittenOff] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const loaderData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const writtenedOffData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(loaderData));
    setSearchWrittenOff(loaderData);
    setWrittenOffData(loaderData);
    const loaderFunction = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        if (response.data.data.role === "Učenik") {
          setUserInfo(response.data.data);
        } else if (response.data.data.role === "Bibliotekar") {
          navigate(`/librarians/${id}`);
        } else if (response.data.data.role === "Administrator") {
          navigate(`/administrators/${id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    loaderFunction();
  }, []);

  useEffect(() => {
    if (search !== "") {
      setWrittenOffData(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (writtenedOffData !== null) {
        setWrittenOffData(writtenedOffData);
      }
    }
  }, [search, writtenedOffData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchWrittenOff, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchWrittenOff, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const writtenedOffToDisplay = writtenOffData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(writtenOffData.length / itemsPerPage);

  return (
    <ProfileEvidence
      searchColumn={handleColumnSearch}
      searchGlobal={handleGlobalSearch}
      itemsPerPageHandler={itemPerPageHandler}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      tableData={writtenedOffToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestWrittenOff = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      return responseData.otpisane.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
