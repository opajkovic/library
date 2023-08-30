import { useOutletContext } from "react-router";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Select from "../../components/UI/Select";
import Pagination from "../../components/UI/Pagination";
import './librarians.css'

const Librarians = () => {
  const DUMMY_TABLE_DATA = [
    {
      name: "Valentina Kašćelan",
      email: "valentina.kascelan@domain...",
      role: "Bibliotekar",
      lastHeader: "Prije 10 sati",
    },
    {
      name: "Valentina Kašćelan",
      email: "valentina.kascelan@domain...",
      role: "Bibliotekar",
      lastHeader: "Prije 10 sati",
    },
    {
      name: "Valentina Kašćelan",
      email: "valentina.kascelan@domain...",
      role: "Bibliotekar",
      lastHeader: "Prije 10 sati",
    },
  ];

  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("librarians");
  }, []);

  return (
    <div >
      <PageTitle title="Bibliotekari" />
      <div className="page-wrapper">

        <TableControl title="Novi bibliotekar" />
        <Table
          mainHeader="Ime i prezime"
          headers={["email", "role"]}
          lastHeader="Poslednji pristup sistemu"
          tableData={DUMMY_TABLE_DATA}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </div>
  );
};

export default Librarians;
