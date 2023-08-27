import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Button from "../../components/UI/Button";
import Table from "../../components/UI/Table";
import { FaPlus } from "react-icons/fa";

const DUMMY_TABLE_DATA = [
  {
    id: 1,
    name: "Robinson Kruso",
    Author: "Daniel Defoe",
    Kategorija: "Romani",
    Naraspolaganju: 3,
    Rezervisano: 2,
    Izdato: 0,
    Uprekoračenju: 2,
    lastHeader: 10,
  },
  {
    id: 2,
    name: "Tom Sojer",
    Author: "Mark Twen",
    Kategorija: "Romani",
    Naraspolaganju: 0,
    Rezervisano: 0,
    Izdato: 10,
    Uprekoračenju: 2,
    lastHeader: 10,
  },
  {
    id: 3,
    name: "Doživljaji mačka Toše",
    Author: "John Biden",
    Kategorija: "Best seller",
    Naraspolaganju: 3,
    Rezervisano: 2,
    Izdato: 0,
    Uprekoračenju: 2,
    lastHeader: 10,
  },
  {
    id: 4,
    name: "Algebra za odrasle",
    Author: "Sali Muntari",
    Kategorija: "Romani",
    Naraspolaganju: 0,
    Rezervisano: 0,
    Izdato: 10,
    Uprekoračenju: 2,
    lastHeader: 10,
  },
];

export default function Books() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("books");
  }, []);
  return (
    <>
      <PageTitle title="Knjige" />
      <div className="librarians-wrapper">
        <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span> Nova knjiga </span>
        </Button>
        <Table
          mainHeader="Naziv knjige"
          headers={[
            "Author",
            "Kategorija",
            "Na raspolaganju",
            "Rezervisano",
            "Izdato",
            "U prekoračenju",
          ]}
          lastHeader="Ukupna količina"
          tableData={DUMMY_TABLE_DATA}
        />
      </div>
    </>
  );
}
