import { useOutletContext, useNavigate } from "react-router";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import "./librarians.css";

const DUMMY_TABLE_DATA = [
  {
    id: 1,
    name: "Valentina Kašćelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastHeader: "Prije 10 sati",
  },
  {
    id: 2,
    name: "Valentina Kašćelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastHeader: "Prije 10 sati",
  },
  {
    id: 3,
    name: "Valentina Kašćelan",
    email: "valentina.kascelan@domain...",
    role: "Bibliotekar",
    lastHeader: "Prije 10 sati",
  },
];

const Librarians = () => {
  const navigate = useNavigate();
  const clickHandler = (id) => {
    navigate(`/librarians/${id}`);
  };
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("librarians");
  }, []);

  return (
    <div>
      <PageTitle title="Bibliotekari" />
      <div className="page-wrapper">
        <TableControl title="Novi bibliotekar" />
        <Table
          mainHeader="Ime i prezime"
          headers={["email", "role"]}
          lastHeader="Poslednji pristup sistemu"
          tableData={DUMMY_TABLE_DATA}
          options={{
            first: "Pogledaj detalje",
            second: "Izmijeni",
            third: "Izbriši",
            forth:""
          }}
          onClick={clickHandler}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </div>
  );
};

export default Librarians;
