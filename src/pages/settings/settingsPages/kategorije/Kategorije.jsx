import "./kategorije.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import Button from "../../../../components/UI/Button";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import Table from "../../../../components/UI/Table";

const categories = [
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

  const handleDots = () => {};
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"kategorije"} />
      <div className="category-wrapper">
        <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span>Nova kategorija</span>
        </Button>
        <Table
          mainHeader="Nova kategorija"
          lastHeader="Opis"
          tableData={categories}
        />
      </div>
    </div>
  );
}
