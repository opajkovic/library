import React, { useEffect } from "react";
import "./BookInfo.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext } from "react-router";
import Titles from "./components/Titlles";
import RightSide from "./components/RightSide";
import Informations from "./components/Informations";
import Specification from "./components/Specifications";
import Multimedia from "./components/Multimedia";

export default function BookInfo({ specification, multimedia }) {
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
          {!specification && !multimedia && <Informations />}
        </div>
        <RightSide />
      </div>
    </div>
  );
}
