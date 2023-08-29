import React, { useEffect } from "react";
import "./pismo.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";

const DUMMY_DATA = [
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
      <div className="pageTableWrapper">

      <Menu selectedSettings={"pismo"} />
      <SettingsTable
        title="Novo pismo"
        mainHeader="Pismo"
        tableData={DUMMY_DATA}
        headers=""
        lastHeader=""
      />
      </div>
    </div>
  );
}
