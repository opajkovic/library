import "./kategorije.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    Novakategorija: "Hrana i pice",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 2,
    Novakategorija: "Djecije knjige",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 3,
    Novakategorija: "Istorija",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 4,
    Novakategorija: "Skolske knjige",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 5,
    Novakategorija: "Nauka, priroda i matematika",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 6,
    Novakategorija: "Pravo",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
  {
    id: 7,
    Novakategorija: "Hrana i pice",
    Opis: "Lorem ipsum dolor sit amet consectetur adipising eli,",
  },
];

const headers = [
  { headerName: "Nova kategorija", sort: true, dropdown: false },
  { headerName: "Opis", sort: false, dropdown: true },
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
          headers={headers}
          tableData={DUMMY_DATA}
          options={[
            {
              text: "Izmijeni kategoriju",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi kategoriju",
              icon: <FaTrash />,
              path: "",
            },
          ]}
        />
      </div>
    </div>
  );
}
