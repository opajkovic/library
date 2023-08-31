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

      <Menu selectedSettings={"pismo"} />
      <div className="page-wrapper">
      <SettingsTable
        title="Novo pismo"
        mainHeader="Pismo"
        tableData={DUMMY_DATA}
        headers=""
        lastHeader=""
        options={{
          first: "",
          second: "izmijeni pismo",
          third: "Izbriši pismo",
          forth: "",
        }}
      />
      </div>
    </div>
  );
}
