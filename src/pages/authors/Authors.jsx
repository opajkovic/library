import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import Button from "../../components/UI/Button";
import { FaPlus } from "react-icons/fa";

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
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("authors");
  }, []);
  return (
    <>
      <PageTitle title="Autori" />
      <div className="librarians-wrapper">
        <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span> Novi autor </span>
        </Button>
        <Table
          mainHeader="Naziv autora"
          lastHeader="Opis"
          tableData={DUMMY_AUTHOR_DATA}
        />
      </div>
    </>
  );
}
