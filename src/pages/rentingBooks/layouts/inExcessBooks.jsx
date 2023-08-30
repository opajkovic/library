import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";


export default function InExcessBooks() {
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
          "Izdato učeniku",
          "Datum izdavanja",
          "Prekoračenje u danima",
          "Trenutno zadržavanje knjige",
        ]}
      />
    </div>
  );
}
