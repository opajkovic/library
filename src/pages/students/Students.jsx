import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";

const DUMMY_TABLE_DATA = [
  // {
  //   id: 1,
  //   Imeiprezime: "Pero Perović",
  //   email: "pero.perovic@domain.net",
  //   role: "Ucenik",
  //   Poslednjipristupsistemu: "Prije 10 sati",
  // },
  // {
  //   id: 2,
  //   Imeiprezime: "Sebastijan Nikolić",
  //   email: "sebo.nikolic@domain.net",
  //   role: "Ucenik",
  //   Poslednjipristupsistemu: "Prije 2 dana",
  // },
  // {
  //   id: 3,
  //   Imeiprezime: "Makarona Žarković",
  //   email: "mara.bubamara@domain.net",
  //   role: "Ucenik",
  //   Poslednjipristupsistemu: "Prije 10 sati",
  // },
  // {
  //   id: 4,
  //   Imeiprezime: "Kristijano Palikuća",
  //   email: "callmekristyxxx@domain.net",
  //   role: "Ucenik",
  //   Poslednjipristupsistemu: "Prije 2 dana",
  // },
  // {
  //   id: 5,
  //   Imeiprezime: "Rihana Kalimperović",
  //   email: "rijana.kali@domain.net",
  //   role: "Ucenik",
  //   Poslednjipristupsistemu: "Prije 2 dana",
  // },
];

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false },
  { headerName: "email", sort: false, dropdown: false },
  { headerName: "role", sort: false, dropdown: false },
  { headerName: "Poslednji pristup sistemu", sort: false, dropdown: true },
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
