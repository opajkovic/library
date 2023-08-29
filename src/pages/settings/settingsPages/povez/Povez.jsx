import React, { useEffect } from "react";
import "./povez.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useOutletContext } from "react-router";
import Table from "../../../../components/UI/Table";
import TableControl from "../../../../components/UI/TableControl";

const categories = [
  {
    id: 1,
    name: "Kožni",
  },
  {
    id: 2,
    name: "Meki",
  },
  {
    id: 3,
    name: "Poluplatneni",
  },
  {
    id: 4,
    name: "Tvrdi",
  },
];

export default function Povez() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"povez"} />
      <div className="category-wrapper">
        <TableControl title="Novi povez" />
        <Table
          mainHeader="Povez"
          tableData={categories}
          headers=""
          lastHeader=""
        />
      </div>
    </div>
  );
}
