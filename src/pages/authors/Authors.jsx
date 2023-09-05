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
    name: "Mark Twain",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 2,
    name: "Uroš Tošković",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 3,
    name: "Kale Gospodar vremena",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 4,
    name: "Zvonko Bogdan",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 5,
    name: "Željko Pajović",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "Opis", sort: false, dropdown: true, dataKey: "description" },
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
          path="/authors"
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
              noPath: true,
            },
          ]}
        />
        <Pagination items={DUMMY_AUTHOR_DATA} />
      </div>
    </>
  );
}
