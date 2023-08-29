import { useEffect } from "react";
import "./zanrovi.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import Table from "../../../../components/UI/Table";
import TableControl from "../../../../components/UI/TableControl";

const categories = [
  {
    id: 1,
    name: "Autobiografija",
  },
  {
    id: 2,
    name: "Enciklopedija",
  },
  {
    id: 3,
    name: "Fantazija",
  },
  {
    id: 4,
    name: "Komedija",
  },
];

export default function Zanrovi() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"zanrovi"} />
      <div className="category-wrapper">
        <TableControl title="Novi žanr" />
        <Table
          mainHeader="Žanr"
          tableData={categories}
          headers=""
          lastHeader=""
        />
      </div>
    </div>
  );
}
