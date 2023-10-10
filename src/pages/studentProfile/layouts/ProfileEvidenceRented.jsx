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
    sort: true,
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
    headerName: "Trenutno zadržavanje knjiga",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Knjigu izdao",
    sort: false,
    dropdown: true,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
];

export default function ProfileEvidenceRented() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

<<<<<<< HEAD
  const [userInfo, setUserInfo] = useState();
  const [rentData, setRentData] = useState([]);
  const [searchRent, setSearchRent] = useState([]);
  const [search, setSearch] = useState("");
=======
  const headers = [
    { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: 'knjiga.title',
    path: "/books/:id",
    pathId: "knjiga"},
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname',
    path: "/students/:id",
    pathId: "student", },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Knjigu izdao", sort: false, dropdown: true, dataKey: 'bibliotekar0.name+bibliotekar0.surname', path: '/librarians/:id', pathId: 'bibliotekar' },
  ];
  useEffect(()=>{
    let dataUn = loaderData
    setTableData(dataUn)
    api.get(`/users/${id}`).then(response => {
      if(response.data.data.role == 'Učenik'){
        setUserInfo(response.data.data)
      }
      else if(response.data.data.role == "Bibliotekar"){
        navigate(`/librarians/${id}`)
      }else if(response.data.data.role == "Administrator"){
        navigate(`/administrators/${id}`)
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },[])
>>>>>>> 01765ffbbd3fc98aebe424e2279ecee0e2ef5f63

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const loaderData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const rentedData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateRentingData(loaderData));
    setSearchRent(loaderData);
    setRentData(loaderData);
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
      setRentData(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (rentedData !== null) {
        setRentData(rentedData);
      }
    }
  }, [search, rentedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchRent, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchRent, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const rentedToDisplay = rentData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(rentData.length / itemsPerPage);

  return (
    <ProfileEvidence
      searchColumn={handleColumnSearch}
      searchGlobal={handleGlobalSearch}
      itemsPerPageHandler={itemPerPageHandler}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      tableData={rentedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestRented = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
<<<<<<< HEAD
      return responseData.izdate.filter((el) => el.student.id == id);
=======
      let responseData2 = responseData.izdate.filter(el => el.student.id == id)
      data = responseData2
      return data
>>>>>>> 01765ffbbd3fc98aebe424e2279ecee0e2ef5f63
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
