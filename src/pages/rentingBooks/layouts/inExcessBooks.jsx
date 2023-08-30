import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../../components/pageTitle/PageTitle";
import RentingOptions from "../components/RentingOptions";
import Table from "../../../components/UI/Table";
import "../rentingBooks.css";
import TableControl from "../../../components/UI/TableControl";
import Pagination from "../../../components/UI/Pagination";

const DUMMY_TABLE_DATA = [];

export default function InExcessBooks() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("rentingBooks");
  }, []);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <div className="bottom-container">
        <RentingOptions />
        <div className="table-wrapper">
          <TableControl title="Nova knjiga" hide='true'/>
          <Table
            mainHeader=""
            headers={[
              "Naziv knjige",
              "Izdato učeniku",
              "Datum izdavanja",
              "Prekoračenje u danima",
              "Trenutno zadržavanje knjige",
            ]}
            lastHeader=""
            tableData={DUMMY_TABLE_DATA}
          />
          <Pagination items={DUMMY_TABLE_DATA} />
        </div>
      </div>
    </div>
  );
}
