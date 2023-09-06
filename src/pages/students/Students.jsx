import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";



const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  {
    headerName: "Poslednji pristup sistemu",
    sort: false,
    dropdown: true,
    dataKey: "lastOnline",
  },
];

export default function Students() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  let [students, setStudents] = useState([])

  

  useEffect(() => {
    async function fetchData() {
      try {
        const students1 = await LoaderStudents();
        setStudents(students1);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    }
  
    fetchData();
    setRoute("students");
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    navigate("/students/new");
  };

  return (
    <>
      <PageTitle title="Učenici" />
      <div className="page-wrapper">
        <TableControl title="Novi ucenik" onClick={() => handleClick()} />
        <Table
          path="/students"
          headers={headers}
          tableData={students}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/students/",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "/students/",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        <Pagination items={students} />
      </div>
    </>
  );
}

export async function LoaderStudents() {
  try {
    const response = await api.get(`/users`);
    const responseData = response.data.data;
    let listOfStudents = [];

    responseData.forEach(element => {
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
}