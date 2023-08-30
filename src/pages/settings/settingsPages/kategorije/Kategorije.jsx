import "./kategorije.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import SettingsTable from "../../components/SettingsTable";
import Pagination from "../../../../components/UI/Pagination";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Hrana i pice",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 2,
    name: "Djecije knjige",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 3,
    name: "Istorija",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 4,
    name: "Skolske knjige",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 5,
    name: "Nauka, priroda i matematika",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 6,
    name: "Pravo",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 7,
    name: "Hrana i pice",
    lastHeader: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
];
export default function Kategorije() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);

  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"kategorije"} />
      <div className="page-wrapper">
      <SettingsTable
        title="Nova Kategorija"
        mainHeader="Kategorija"
        lastHeader="Opis"
        tableData={DUMMY_DATA}
        headers=""
      />
      </div>
    </div>
  );
}
