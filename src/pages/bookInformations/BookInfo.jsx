import React, { useEffect, useState } from "react";
import "./BookInfo.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useOutletContext } from "react-router";
import Titles from "./components/Titlles";
import RightSide from "./components/RightSide";
import Informations from "./components/Informations";
import Specification from "./components/Specifications";
import Multimedia from "./components/Multimedia";
import EvidenceTable from "./components/EvidenceTable";
import api from "../../api/apiCalls";

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
  let [book, setBook] = useState({
    title: "loading...",
    categories: [{ name: "loading...", surname: "loading..." }],
    authors: [{ name: "loading...", surname: "loading..." }],
    genres: [{ name: "loading...", surname: "loading..." }],
    publisher: { name: "loading..." },
    pDate: "2023",
    description: "loading...",
    language: { name: "loading..." },
    bookbind: { name: "loading..." },
    format: { name: "loading..." },
    isbn: "loading...",
    photo: "",
  });
  const fetchedData = useLoaderData();

  useEffect(() => {
    setBook(fetchedData);
    setRoute("/books/:id/specifikacija");
  }, []);
  return (
    <div className="book-container">
      <ProfileTitle
        userInfo={book ? { name: book.title } : { name: "loading..." }}
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        image={book.photo}
        change={true}
        deleteMssg={true}
        booksSpecial={true}
        editPath={`/books/${fetchedData.id}/edit`}
        rentPath={`/books/${fetchedData.id}/izdaj`}
      />
      <div className="bottom-wrapper">
        <div>
          <Titles />
          {specification && <Specification bookInfo={book} />}
          {multimedia && <Multimedia photos={[book.photo]} />}

          {evidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                {
                  headerName: "Datum rezervacije",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervacija ističe",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervaciju podnio",
                  sort: false,
                  dropdown: false,
                },
                { headerName: "Status", sort: false, dropdown: true },
              ]}
            />
          )}

          {rentedEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                {
                  headerName: "Datum rezervacije",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervacija ističe",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervaciju podnio",
                  sort: false,
                  dropdown: false,
                },
                { headerName: "Status", sort: false, dropdown: true },
              ]}
            />
          )}

          {returnedEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Izdato učeniku", sort: false, dropdown: false },
                { headerName: "Datum izdavanja", sort: false, dropdown: false },
                { headerName: "Datum vraćanja", sort: false, dropdown: false },
                {
                  headerName: "Zadržavanje knjige",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Trenutno zadržavanje knjige",
                  sort: false,
                  dropdown: true,
                },
              ]}
            />
          )}

          {excessEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                { headerName: "Izdato učeniku", sort: false, dropdown: false },
                { headerName: "Datum izdavanja", sort: false, dropdown: false },
                {
                  headerName: "Prekoračenje u danima",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Trenutno zadržavanje knjige",
                  sort: false,
                  dropdown: true,
                },
              ]}
            />
          )}

          {reservationEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                {
                  headerName: "Datum rezervacije",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervacija ističe",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervaciju podnio",
                  sort: false,
                  dropdown: false,
                },
                { headerName: "Status", sort: false, dropdown: true },
              ]}
            />
          )}

          {archivedEvidence && (
            <EvidenceTable
              headers={[
                { headerName: "Naziv knjige", sort: false, dropdown: false },
                {
                  headerName: "Datum rezervacije",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervacija zatvorena",
                  sort: false,
                  dropdown: false,
                },
                {
                  headerName: "Rezervaciju podnio",
                  sort: false,
                  dropdown: false,
                },
                { headerName: "Status", sort: false, dropdown: true },
              ]}
            />
          )}

          {!specification &&
            !multimedia &&
            !evidence &&
            !rentedEvidence &&
            !returnedEvidence &&
            !excessEvidence &&
            !reservationEvidence &&
            !archivedEvidence && <Informations bookInfo={book} />}
        </div>
        <RightSide bookInfo={book} />
      </div>
    </div>
  );
}
export const BookLoader = async ({ params }) => {
  const id = params.id;
  try {
    const response = await api.get(`/books/${id}`);
    const responseData = response.data.data;
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
