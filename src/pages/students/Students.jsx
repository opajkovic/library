import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, filterSearchedData } from "../../redux/actions";
import api from "../../api/apiCalls";
import { updateStudentsData } from "../../redux/student-data";
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

export default function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);  

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const updatedSortedData = useSelector((state) => state.sort.sortedData);
  const studentsData = useSelector((state) => state.students);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateStudentsData(fetchedData));
    setStudents(fetchedData);
    dispatch(sortedData(fetchedData))
  }, []);

  useEffect(() => {
    if(search !== "") {
      setStudents(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    }
    else {
      if(studentsData !== null){
        setStudents(studentsData)
      }
    }
  }, [search, studentsData]);

  const handleClick = () => {
    navigate("/students/new");
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
    dispatch(sortData(students))
  }

  useEffect(()=>{
    setStudents(updatedSortedData)
  },[updatedSortedData])

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      toast.success("Izbrisan student");
      dispatch(deleteStudent(studentsData, id));
  
      if (search !== "") {
        setStudents(searchData.filter((item) => item.id !== id));
      } else {
        setStudents(studentsData.filter((item) => item.id !== id));
      }
  
      navigate("/students");
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };
  

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const studentsToDisplay = students.slice(startIndex, endIndex);
  const pageCount = Math.ceil(students.length / itemsPerPage);

  return (
    <>
      <PageTitle title="Učenici" />
      <div className="page-wrapper">
        <TableControl
          title="Novi ucenik"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          searchGlobal={handleGlobalSearch}
        />
        <Table
          path="/students"
          headers={headers}
          tableData={studentsToDisplay}
          searchColumn={handleColumnSearch}
          handleDelete={handleDelete}
          handleSort={handleSort}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: ""
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "edit"
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        {students.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
      </div>
    </>
  );
}

export async function LoaderStudents() {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/users`);
      const responseData = response.data.data;
      let listOfStudents = [];
  
      responseData.forEach((element) => {
        if (element.role === "Učenik") {
          listOfStudents = [...listOfStudents, element];
        }
      });
  
      // Now 'listOfStudents' contains the array of students.
      return listOfStudents;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
}
