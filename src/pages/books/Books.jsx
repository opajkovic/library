import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import {
  FaCalendar,
  FaEdit,
  FaHandScissors,
  FaLevelUpAlt,
  FaRedo,
  FaRegFile,
  FaTrash,
} from "react-icons/fa";

const DUMMY_TABLE_DATA = [
  // {
  //   id: 1,
  //   Nazivknjige: "Robinson Kruso",
  //   Autor: "Daniel Defoe",
  //   Kategorija: "Romani",
  //   Naraspolaganju: 3,
  //   Rezervisano: 2,
  //   Izdato: 0,
  //   Uprekoračenju: 2,
  //   Ukupnakoličina: 10,
  // },
  // {
  //   id: 2,
  //   Nazivknjige: "Tom Sojer",
  //   Autor: "Mark Twen",
  //   Kategorija: "Romani",
  //   Naraspolaganju: 0,
  //   Rezervisano: 0,
  //   Izdato: 10,
  //   Uprekoračenju: 2,
  //   Ukupnakoličina: 10,
  // },
  // {
  //   id: 3,
  //   Nazivknjige: "Doživljaji mačka Toše",
  //   Autor: "John Biden",
  //   Kategorija: "Best seller",
  //   Naraspolaganju: 3,
  //   Rezervisano: 2,
  //   Izdato: 0,
  //   Uprekoračenju: 2,
  //   Ukupnakoličina: 10,
  // },
  // {
  //   id: 4,
  //   Nazivknjige: "Algebra za odrasle",
  //   Autor: "Sali Muntari",
  //   Kategorija: "Romani",
  //   Naraspolaganju: 0,
  //   Rezervisano: 0,
  //   Izdato: 10,
  //   Uprekoračenju: 2,
  //   Ukupnakoličina: 10,
  // },
];

const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false },
  { headerName: "Autor", sort: false, dropdown: false },
  { headerName: "Kategorija", sort: false, dropdown: false },
  { headerName: "Na raspolaganju", sort: false, dropdown: false },
  { headerName: "Rezervisano", sort: false, dropdown: false },
  { headerName: "Izdato", sort: false, dropdown: false },
  { headerName: "U prekoračenju", sort: false, dropdown: false },
  { headerName: "Ukupna količina", sort: false, dropdown: true },
];

export default function Books() {
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
          path="/books"
          headers={headers}
          tableData={DUMMY_TABLE_DATA}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaRegFile />,
              url: "/books/1",
            },
            {
              text: "Izmijeni knjigu",
              icon: <FaEdit />,
              url: "/books/1",
            },
            {
              text: "Otpisi knjigu",
              icon: <FaLevelUpAlt />,
              url: "/books/1",
            },
            {
              text: "Izdaj knjigu",
              icon: <FaHandScissors />,
              url: "/books/1",
            },
            {
              text: "Vrati knjigu",
              icon: <FaRedo />,
              url: "/books/1",
            },
            {
              text: "Rezervisi knjigu",
              icon: <FaCalendar />,
              url: "/books/1",
            },
            {
              text: "Izbrisi knjigu",
              icon: <FaTrash />,
              noPath: true
            },
          ]}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </>
  );
}
