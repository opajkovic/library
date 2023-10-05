import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import "./librarians.css";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { deleteLibrarian, filterSearchedData } from "../../redux/actions";
import { updateLibrariansData } from "../../redux/librarian-data";
import { sortData } from "../../redux/actions";
import { sortedData } from "../../redux/sort-data";
import { toast } from "react-toastify";
import { auth } from "../../services/AuthService";

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name+surname" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Username", sort: false, dropdown: true, dataKey: "username" },
];

const Librarians = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [librarians, setLibrarians] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);  

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const updatedSortedData = useSelector((state) => state.sort.sortedData);
  const librariansData = useSelector((state) => state.librarians);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateLibrariansData(fetchedData));
    setLibrarians(fetchedData)
    dispatch(sortedData(fetchedData))
  }, []);

  useEffect(() => {
    if(search !== "") {
      setLibrarians(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    }
    else {
      if(librariansData !== null){
        setLibrarians(librariansData)
      }
    }
  }, [search, librariansData]);

  const handleClick = () => {
    navigate("/librarians/new");
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(fetchedData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(fetchedData, headerName, searchValue));
  };

  const handleSort = () => {
    dispatch(sortData(librarians))
  }

  useEffect(()=>{
    setLibrarians(updatedSortedData)
  },[updatedSortedData])

  const handleDelete = async (id) => {
    if (!!localStorage.getItem('token') && ((localStorage.getItem("role") == 'Bibliotekar' && localStorage.getItem("id") == fetchedData.id) || localStorage.getItem("role") == 'Administrator')) { 
    try {
      const response = await api.delete(`/users/${id}`);
      toast.success("Izbrisan bibliotekar");
      dispatch(deleteLibrarian(librariansData, id));
  
      if (search !== "") {
        setLibrarians(searchData.filter((item) => item.id !== id));
      } else {
        setLibrarians(librariansData.filter((item) => item.id !== id));
      }
  
      navigate("/librarians");
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }else{

    toast.error("Nemate pravo izbrisati ovog bibliotekara!")
  }
  };
  

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const librariansToDisplay = librarians.slice(startIndex, endIndex);
  const pageCount = Math.ceil(librarians.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Bibliotekari" />
      <div className="page-wrapper">
        <TableControl
          title="Novi bibliotekar"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          searchGlobal={handleGlobalSearch}
        />
        <Table
          path="/librarians"
          headers={headers}
          tableData={librariansToDisplay}
          searchColumn={handleColumnSearch}
          handleDelete={handleDelete}
          handleSort={handleSort}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "edit",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        {librarians.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
      </div>
    </div>
  );
};

export default Librarians;

export async function LoaderLibrarians() {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/users`);
      const responseData = response.data.data;
      const listOfBibliotekars = responseData.filter(
        (item) => item.role === "Bibliotekar"
      );
      return listOfBibliotekars;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
}
