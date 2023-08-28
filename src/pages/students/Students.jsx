import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Button from "../../components/UI/Button";
import Table from "../../components/UI/Table";
import { FaPlus } from "react-icons/fa";

export default function Students() {
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

  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("students");
  }, []);
  return (
    <>
      <PageTitle title="Učenici" />
      <div className="librarians-wrapper">
        <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span> Novi ucenik </span>
        </Button>
        <Table
          mainHeader="Ime i prezime"
          headers={["email", "role"]}
          lastHeader="Poslednji pristup sistemu"
          tableData={DUMMY_TABLE_DATA}
        />
      </div>
    </>
  );
}
