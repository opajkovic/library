import { useNavigate, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import "./librarians.css";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Poslednji pristup sistemu", sort: false, dropdown: true, dataKey: "lastOnline" },
];

const Librarians = () => {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  let [librarians, setLibrarians] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const librarians1 = await LoaderLibrarians();
        setLibrarians(librarians1);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    }
  
    fetchData();
    setRoute("librarians");
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    navigate("/librarians/new");
  };
  return (
    <div>
      <PageTitle title="Bibliotekari" />
      <div className="page-wrapper">
        <TableControl title="Novi bibliotekar" onClick={()=>handleClick()} />
        <Table
          path="/librarians"
          headers={headers}
          tableData={librarians}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/librarians/",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "/librarians/",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        <Pagination items={librarians} />
      </div>
    </div>
  );
};

export default Librarians;
export async function LoaderLibrarians() {
  try {
    const response = await api.get(`/users`);
    const responseData = response.data.data;
    let listOfStudents = [];

    responseData.forEach(element => {
      if (element.role === "Bibliotekar") {
        listOfStudents = [...listOfStudents, element];
      }
    });

    // Now 'listOfStudents' contains the array of students.
    return listOfStudents;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}