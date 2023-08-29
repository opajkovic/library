import React, { useEffect } from "react";
import "./povez.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";

const DUMMY_DATA = [
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
      <SettingsTable
        title="Novi povez"
        mainHeader="Povez"
        tableData={DUMMY_DATA}
        headers=""
        lastHeader=""
      />
    </div>
  );
}
