import React, { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";

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

const forth = [
  "otpiši knjigu",
  "Izdaj knjigu",
  "Vrati knjigu",
  "Rezerviši knjigu",
];

export default function Books() {
  const navigate = useNavigate();
  const clickHandler = (id)=>{
    navigate(`/books/${id}`)
  }
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("books");
  }, []);
  return (
    <>
      <PageTitle title="Knjige" />
      <div className="page-wrapper">
        <TableControl title="Nova knjiga" />
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
          options={{
            first: "Pogledaj detalje",
            second: "izmijeni knjigu",
            third: "Izbriši knjigu",
            forth: {forth},
          }}
          onClick={clickHandler}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </>
  );
}
