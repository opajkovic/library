import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";


export default function ArchivedReservations() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("rentingBooks");
  }, []);

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        title="Nova knjiga"
        headers={[
          "Naziv knjige",
          "Datum rezervacije",
          "Rezervacija zatvorena",
          "Rezervaciju podnio",
          "Status",
        ]}
      />
    </div>
  );
}
