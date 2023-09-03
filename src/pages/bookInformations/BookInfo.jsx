import React, { useEffect } from "react";
import "./BookInfo.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext } from "react-router";
import Titles from "./components/Titlles";
import RightSide from "./components/RightSide";
import Informations from "./components/Informations";
import Specification from "./components/Specifications";
import Multimedia from "./components/Multimedia";
import EvidenceTable from "./components/EvidenceTable";

export default function BookInfo({
  specification,
  multimedia,
  evidence,
  rentedEvidence,
  returnedEvidence,
  reservationEvidence,
  excessEvidence,
  archivedEvidence,
}) {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("/books/:id/specifikacija");
  }, []);
  return (
    <div className="book-container">
      <ProfileTitle
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        image="https://m.media-amazon.com/images/I/5167YEsQ6YL.jpg"
        change={true}
        deleteMssg={true}
        booksSpecial={true}
      />
      <div className="bottom-wrapper">
        <div>
          <Titles />
          {specification && <Specification />}
          {multimedia && <Multimedia />}

          {evidence && <EvidenceTable headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Datum rezervacije", sort: false, dropdown: false },
                { headerName: "Rezervacija ističe", sort: false, dropdown: false },
                { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
                { headerName: "Status", sort: false, dropdown: true },
              ]}/>}

          {rentedEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Datum rezervacije", sort: false, dropdown: false },
                { headerName: "Rezervacija ističe", sort: false, dropdown: false },
                { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
                { headerName: "Status", sort: false, dropdown: true },
              ]}/>
          )}

          {returnedEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Izdato učeniku", sort: false, dropdown: false },
                { headerName: "Datum izdavanja", sort: false, dropdown: false },
                { headerName: "Datum vraćanja", sort: false, dropdown: false },
                { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
                { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true },
              ]}/>
          )}

          {excessEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Izdato učeniku", sort: false, dropdown: false },
                { headerName: "Datum izdavanja", sort: false, dropdown: false },
                { headerName: "Prekoračenje u danima", sort: false, dropdown: false },
                { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true },
              ]}/>
          )}

          {reservationEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Datum rezervacije", sort: false, dropdown: false },
                { headerName: "Rezervacija ističe", sort: false, dropdown: false },
                { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
                { headerName: "Status", sort: false, dropdown: true },
              ]}/>
          )}

          {archivedEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Datum rezervacije", sort: false, dropdown: false },
                { headerName: "Rezervacija zatvorena", sort: false, dropdown: false },
                { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
                { headerName: "Status", sort: false, dropdown: true },
              ]}/>
          )}

          {!specification &&
            !multimedia &&
            !evidence &&
            !rentedEvidence &&
            !returnedEvidence &&
            !excessEvidence &&
            !reservationEvidence &&
            !archivedEvidence && <Informations />}
        </div>
        <RightSide />
      </div>
    </div>
  );
}
