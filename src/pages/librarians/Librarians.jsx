import { useNavigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import "./librarians.css";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";

const DUMMY_TABLE_DATA = [
  {
    id: 1,
    name: "Valentina Kašćelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastOnline: "Prije 10 sati",
  },
  {
    id: 2,
    name: "Valentina Kašćelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastOnline: "Prije 10 sati",
  },
  {
    id: 3,
    name: "Valentina Kašćelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastOnline: "Prije 10 sati",
  },
];

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Poslednji pristup sistemu", sort: false, dropdown: true, dataKey: "lastOnline" },
];

const Librarians = () => {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
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
          tableData={DUMMY_TABLE_DATA}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/librarians/1",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "/librarians/1",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </div>
  );
};

export default Librarians;
