import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";

const DUMMY_TABLE_DATA = [
  {
    id: 1,
    name: "Pero Perović",
    email: "pero.perovic@domain.net",
    role: "Ucenik",
    lastOnline: "Prije 10 sati",
  },
  {
    id: 2,
    name: "Pero Perović",
    email: "pero.perovic@domain.net",
    role: "Ucenik",
    lastOnline: "Prije 10 sati",
  },
  {
    id: 3,
    name: "Pero Perović",
    email: "pero.perovic@domain.net",
    role: "Ucenik",
    lastOnline: "Prije 10 sati",
  },
];

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Poslednji pristup sistemu", sort: false, dropdown: true, dataKey: "lastOnline" },
];

export default function Students() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("students");
  }, []);
  return (
    <>
      <PageTitle title="Učenici" />
      <div className="page-wrapper">
        <TableControl title="Novi ucenik" />
        <Table
          path="/students"
          headers={headers}
          tableData={DUMMY_TABLE_DATA}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/librarians/1",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "/librarians/1",
            },
            {
              text: "Izbrisi korisnika",
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
