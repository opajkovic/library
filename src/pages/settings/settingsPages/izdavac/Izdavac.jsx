import React, { useEffect } from "react";
import "./izdavac.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import Table from "../../../../components/UI/Table";
import TableControl from "../../../../components/UI/TableControl";

const categories = [
  {
    id: 1,
    name: "Arto",
  },
  {
    id: 2,
    name: "Balbelo",
  },
  {
    id: 3,
    name: "Cid",
  },
  {
    id: 4,
    name: "Cosmo",
  },
];

export default function Izdavac() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"izdavac"} />
      <div className="category-wrapper">
        <TableControl title="Novi izdavač" />
        <Table
          mainHeader="Izdavač"
          tableData={categories}
          headers=""
          lastHeader=""
        />
      </div>
    </div>
  );
}
