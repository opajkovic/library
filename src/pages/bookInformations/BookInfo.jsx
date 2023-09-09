import React, { useEffect, useState } from "react";
import "./BookInfo.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useOutletContext } from "react-router";
import RightSide from "./components/RightSide";
import api from "../../api/apiCalls";
import ConditionalContainer from "./components/ConditionalContainer";

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
      />
      <div className="bottom-wrapper">
        <ConditionalContainer
          specification={specification}
          multimedia={multimedia}
          evidence={evidence}
          rentedEvidence={rentedEvidence}
          returnedEvidence={returnedEvidence}
          reservationEvidence={reservationEvidence}
          excessEvidence={excessEvidence}
          archivedEvidence={archivedEvidence}
          book={book}
          photo={book.photo}
        />
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

    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
