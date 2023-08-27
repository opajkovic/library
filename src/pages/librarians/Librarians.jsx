import { useOutletContext } from "react-router";
import "./librarians.css";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Button from "../../components/UI/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../components/UI/Table";

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
    <>
      <PageTitle title="Bibliotekari" />
      <div className="librarians-wrapper">
        <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span> Novi bibliotekar </span>
        </Button>
        <Table
          mainHeader="Ime i prezime"
          headers={["email", "role"]}
          lastHeader="Poslednji pristup sistemu"
          tableData={DUMMY_TABLE_DATA}
        />
      </div>
    </>
  );
};

export default Librarians;
