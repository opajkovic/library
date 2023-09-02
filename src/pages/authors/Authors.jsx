import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";

const DUMMY_AUTHOR_DATA = [
  {
    id: 1,
    Nazivknjige: "Mark Twain",
    Opis: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 2,
    Nazivknjige: "Uroš Tošković",
    Opis: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 3,
    Nazivknjige: "Kale Gospodar vremena",
    Opis: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 4,
    Nazivknjige: "Zvonko Bogdan",
    Opis: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 5,
    Nazivknjige: "Željko Pajović",
    Opis: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false },
  { headerName: "Opis", sort: false, dropdown: true },
];

export default function Authors() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("authors");
  }, []);
  return (
    <>
      <PageTitle title="Autori" />
      <div className="page-wrapper">
        <TableControl title="Novi autor" />
        <Table
          tableData={DUMMY_AUTHOR_DATA}
          headers={headers}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/librarians/1",
            },
            {
              text: "Izmijeni autora",
              icon: <FaEdit />,
              path: "/librarians/1",
            },
            {
              text: "Izbrisi autora",
              icon: <FaTrash />,
              path: "/librarians/1",
            },
          ]}
        />
        <Pagination items={DUMMY_AUTHOR_DATA} />
      </div>
    </>
  );
}
