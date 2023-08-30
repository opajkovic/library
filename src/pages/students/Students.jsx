import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";

const DUMMY_TABLE_DATA = [
  {
    id: 1,
    name: "Pero Perović",
    email: "	pero.perovic@domain.net",
    role: "	Ucenik",
    lastHeader: "	Prije 10 sati",
  },
  {
    id: 2,
    name: "Sebastijan Nikolić",
    email: "sebo.nikolic@domain.net",
    role: "Ucenik",
    lastHeader: "Prije 2 dana",
  },
  {
    id: 3,
    name: "Makarona Žarković",
    email: "	mara.bubamara@domain.net",
    role: "	Ucenik",
    lastHeader: "	Prije 10 sati",
  },
  {
    id: 4,
    name: "Kristijano Palikuća",
    email: "callmekristyxxx@domain.net",
    role: "Ucenik",
    lastHeader: "Prije 2 dana",
  },
  {
    id: 5,
    name: "Rihana Kalimperović",
    email: "rijana.kali@domain.net",
    role: "Ucenik",
    lastHeader: "Prije 2 dana",
  },
];


export default function Students() {
  const navigate = useNavigate();
  const clickHandler = (id)=>{
    navigate(`/students/${id}`)
  }

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
          mainHeader="Ime i prezime"
          headers={["email", "role"]}
          lastHeader="Poslednji pristup sistemu"
          tableData={DUMMY_TABLE_DATA}
          options={{
            first: "Pogledaj detalje",
            second: "izmijeni učenika",
            third: "Izbriši učenika",
          }}
          onClick={clickHandler}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </>
  );
}
