import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";

const DUMMY_AUTHOR_DATA = [
  {
    id: 1,
    name: "Mark Twain",
    lastHeader: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 2,
    name: "Uroš Tošković",
    lastHeader: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 3,
    name: "Kale Gospodar vremena",
    lastHeader: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 4,
    name: "Zvonko Bogdan",
    lastHeader: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    id: 5,
    name: "Željko Pajović",
    lastHeader: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

export default function Authors() {
  const navigate = useNavigate();
  const clickHandler = (id)=>{
    navigate(`/authors/${id}`)
  }
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
          mainHeader="Naziv autora"
          lastHeader="Opis"
          tableData={DUMMY_AUTHOR_DATA}
          headers=""
          options={{
            first: "Pogledaj detalje",
            second: "izmijeni autora",
            third: "Izbriši autora",
          }}
          onClick={clickHandler}
        />
        <Pagination items={DUMMY_AUTHOR_DATA} />
      </div>
    </>
  );
}
