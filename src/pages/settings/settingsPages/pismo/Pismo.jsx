import React, { useEffect } from "react";
import "./pismo.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import Table from "../../../../components/UI/Table";
import TableControl from "../../../../components/UI/TableControl";

const categories = [
  {
    id: 1,
    name: "Ćirlica",
  },
  {
    id: 2,
    name: "Latinica",
  },
];

export default function Pismo() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"pismo"} />
      <div className="category-wrapper">
        <TableControl title="Novo pismo" />
        <Table
          mainHeader="Pismo"
          tableData={categories}
          headers=""
          lastHeader=""
        />
      </div>
    </div>
  );
}
