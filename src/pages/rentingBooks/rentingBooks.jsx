import React from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import "./rentingBooks.css";
import BottomContainer from "./components/BottomContainer";

export default function RentingBooks(props) {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false },
    { headerName: "Knjigu izdao", sort: false, dropdown: true },
  ];

  return (
    <div className={props.className}>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer title="Nova knjiga" headers={headers} />
    </div>
  );
}
